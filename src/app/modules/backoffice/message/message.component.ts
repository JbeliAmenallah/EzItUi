import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Employee } from '../../../shared/models/employee';
import { EmployeeService } from '../../../core/http/employee.service';
import { Router } from '@angular/router';
import { ConversationService } from '../../../core/http/ConversationService.service';
import { Conversation } from '../../../shared/models/conversation';
import { AuthService } from '../../../core/auth/auth.service';
import { MessageService } from '../../../core/http/MessageService.service';
import { Message } from '../../../shared/models/message';
import { io } from 'socket.io-client';
import { SocketService } from '../../../core/http/SocketService.service';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { KeycloakProfile } from 'keycloak-js';



@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers: [DatePipe]
})
export class MessageComponent implements AfterViewInit {
  @ViewChild('chatContainer') private chatContainer: ElementRef;




  mediaRecorder: MediaRecorder;
  audioChunks: any[] = [];
  isRecording: boolean = false;
  contacts: Employee[] = []
  conversations: Conversation[] = [];
  messages: Message[] = [];
  onlineUsers: string[] = [];
  selectedConversationId: string;
  userId: any
  selectedFile: File | null = null;
  newMessage: string = '';
  socket: any;
  typingUsers: string[] = [];
  typingTimeout: any;
  imgesConver: Message[]
  currentUser: Employee;
  selectedContact: Employee
  newConversation: Conversation
  visible: boolean = false;
  employees: Employee[];
  public profile: KeycloakProfile | undefined;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private conversationService: ConversationService,
    private authService: AuthService,
    private messageService: MessageService,
    private socketService: SocketService,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer


  ) { }

  ngOnInit() {
    this.profile=this.authService.profile;
    this.getList1();
    this.getConversation()
    // const token = localStorage.getItem('token');
    this.userId = this.authService.getAuthenticatedUserId();
    console.log("inside chat comp", this.userId)

    this.socketService.connect(this.userId);

    this.socketService.listen('onlineUsers').subscribe((users: string[]) => {
      this.onlineUsers = users;
    });


    this.socketService.listen('typing').subscribe((data) => {
      if (data.conversationId === this.selectedConversationId && data.userId !== this.userId) {
        if (!this.typingUsers.includes(data.userId)) {
          this.typingUsers.push(data.userId);
        }
      }
    });

    this.socketService.listen('stopTyping').subscribe((data) => {
      if (data.conversationId === this.selectedConversationId && data.userId !== this.userId) {
        this.typingUsers = this.typingUsers.filter(id => id !== data.userId);
      }
    });



    this.socketService.listen('messagesSeen').subscribe((data) => {
      if (data.conversationId === this.selectedConversationId) {
        this.messages.forEach(message => {

          message.seen = true;

        });
      }
    });


    // this.getList()
    

    this.socket = io('http://localhost:3000');
    this.socket.on('receiveMessage', (message: Message) => {
      if (message.conversationId === this.selectedConversationId) {
        this.messages.push(message);
        this.getConversation()

      }
    });
  }



  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }


  setCurrentUser() {
    this.currentUser = this.employees.find(contact => contact.keycloakUserId === this.userId);
    console.log("user id inside ucrrent ser",this.userId)
    console.log("inside set current user ",this.employees)
    console.log("inside set current user ",this.currentUser); // Log the current user

  }


  addConversation() {
    const data = {
      "senderId": this.userId,
      "receiverId": this.selectedContact.keycloakUserId
    }
    this.conversationService.create(data).subscribe(
      (data) => {
        this.visible = false
      }
    )
    this.getConversation()
    
  }
  showDialog() {
    this.visible = true;
  }

  onTyping() {
    this.socketService.emitTyping({ userId: this.userId, conversationId: this.selectedConversationId });

    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
      this.socketService.emitStopTyping({ userId: this.userId, conversationId: this.selectedConversationId });
    }, 500);
  }

  isUserOnline(userId: string): boolean {
    return this.onlineUsers.includes(userId);
  }

  getConversation() {
    this.conversationService.list(this.userId).subscribe(
      (data) => {
        this.conversations = data;
        console.log("dataaad", this.conversations)
        this.conversations.forEach(conversation => {
          this.messageService.lastMessage(conversation._id).subscribe(
            (data) => {
              conversation.lastMessage = data.text
              conversation.timeLastMessage = data.createdAt
            }
          )
          const otherMemberId = conversation.members.find(memberId => memberId !== this.userId);
          console.log("other memeber", otherMemberId);
          const contact = this.employees.find(contact => contact.keycloakUserId === otherMemberId);
          // console.log("contact",this.contacts)
          console.log("contact", contact)
          if (contact) {
            conversation.contactName = contact.name;
            // + " "+ contact.lastName;
            //conversation.imageUrl = "'https://avatar.iran.liara.run/username?username='+user.username" ;
            conversation.contactId = contact.keycloakUserId
          }

        });
        console.log("dataaad1", this.conversations)
        
      }

    )
    console.log("conversation list ", this.conversations)
    console.log(this.conversations)
  }

  isUserTyping(userId: string): boolean {
    this.scrollToBottom();
    return this.typingUsers.includes(userId);
  }
  getMessages(conversationId: string) {

    this.messageService.list(conversationId).subscribe(
      (data) => {
        this.messages = data;
        this.scrollToBottom();
      },
      (error) => {
        console.error('Error fetching messages', error);
      }
    );
  }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
    this.sendFile();
  }
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  isImage(fileUrl: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    return imageExtensions.some(ext => fileUrl.toLowerCase().endsWith(ext));
  }

  getList1(): void {
    this.employeeService.getAllEmployees().subscribe(
      (items: Employee[]) => {
        this.employees = items.reverse();
        console.log("contactttss", this.employees); // Now you can access this.employees here
        this.setCurrentUser();
        console.log("current user",this.currentUser)
        this.getConversation();
        console.log(this.getConversation());
      }
    );

  }
  sendFile() {
    if (this.selectedFile && this.selectedConversationId) {
      const formData = new FormData();
      formData.append('conversationId', this.selectedConversationId);
      formData.append('sender', this.userId);
      formData.append('file', this.selectedFile);

      // Determine the file type
      const fileType = this.determineFileType(this.selectedFile);

      // Set the message text based on the file type
      let messageText = 'File is sent';
      if (fileType === 'audio') {
        messageText = 'Audio is sent';
      } else if (fileType === 'image') {
        messageText = 'Image is sent';
      } else if (fileType === 'doc') {
        messageText = 'Doc is sent';
      }

      // Append the message text and type to the form data
      formData.append('type', fileType);
      formData.append('text', messageText);

      this.messageService.uploadFile(formData).subscribe(
        (data) => {
          this.selectedFile = null;
          this.getConversation()
        },
        (error) => {
          console.error('Error sending file', error);
        }
      );
    }
  }


  markMessagesAsSeen(conversationId: string) {
    this.messageService.markMessagesAsSeen(conversationId, this.userId).subscribe(
      () => {
        this.messages.forEach(message => {
          if (message.conversationId === conversationId && message.sender !== this.userId) {
            message.seen = true;
          }
        });
      },
      (error) => {
        console.error('Error marking messages as seen', error);
      }
    );
  }



  determineFileType(file: File): string {
    const audioExtensions = ['.mp3', '.wav', '.aac', '.flac', '.ogg'];
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'];
    const documentExtensions = ['.pdf', '.doc', '.docx', '.txt', '.ppt', '.pptx', '.xls', '.xlsx'];

    const fileName = file.name;
    const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

    if (audioExtensions.includes(fileExtension)) {
      return 'audio';
    } else if (imageExtensions.includes(fileExtension)) {
      return 'image';
    } else if (documentExtensions.includes(fileExtension)) {
      return 'doc';
    } else {
      return 'unknown';
    }
  }

  isAudio(fileUrl: string): boolean {
    const audioExtensions = ['.mp3', '.wav', '.ogg'];
    return audioExtensions.some(ext => fileUrl.toLowerCase().endsWith(ext));
  }

  getConversationOne() {
    return this.conversations.find(c => c._id === this.selectedConversationId);
  }

  // getList() {
  //   this.employeeService.getAllEmployees().subscribe(
  //     (data) => {
  //       console.log('Data received:', data);
  //       this.contacts = data;
  //       this.setCurrentUser();
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }





  selectConversation(conversationId: string) {
    this.selectedConversationId = conversationId;
    this.getImagesConversation(conversationId)
    this.getMessages(conversationId);
    this.scrollToBottom();
    this.markMessagesAsSeen(conversationId);
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  

  getImagesConversation(idConv: any) {
    this.conversationService.listImage(idConv).subscribe(
      data => this.imgesConver = data
    )
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedConversationId) {
      // Simple regex to match common code characters
      const codeRegex = /[`<>{};[\]()=/*+\-]/;
      const isCode = codeRegex.test(this.newMessage);

      console.log('Message text:', this.newMessage);
      console.log('Regex test result (is code):', isCode);

      const message: Message = {
        conversationId: this.selectedConversationId,
        sender: this.userId,
        text: this.newMessage,
        type: isCode ? 'code' : 'text'
      };

      console.log('Sending message:', message);

      this.messageService.create(message).subscribe(
        (data) => {
          // Add the new message to the messages array
          this.newMessage = ''; // Clear the input field
          this.getConversation()
        },
        (error) => {
          console.error('Error sending message', error);
        }
      );
    }
  }
  sendThumbsUp() {
    if (this.selectedConversationId) {
      const thumbsUpEmoji = '👍'; // Thumbs-up emoji
  
      const message: Message = {
        conversationId: this.selectedConversationId,
        sender: this.userId,
        text: thumbsUpEmoji,
        type: 'text' // Change type to 'text' instead of 'emoji'
      };
  
      this.messageService.create(message).subscribe(
        (data) => {
          // Optionally handle success, e.g., clear any input or update conversation
          this.getConversation(); // Refresh the conversation list if necessary
        },
        (error) => {
          console.error('Error sending thumbs-up emoji', error);
        }
      );
    }
  }
  

  // formatDate(date: any): string {
  //   const formattedDate = typeof date === 'string' ? new Date(date) : date;
  //   return this.datePipe.transform(formattedDate, 'dd/MM/yyyy HH:mm:ss') || '';
  // }
  

  startRecording() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.start();
          this.isRecording = true;
          this.mediaRecorder.ondataavailable = (event) => {
            this.audioChunks.push(event.data);
          };
        })
        .catch(error => {
          console.error('Error accessing audio devices.', error);
        });
    }
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/mpeg' });
        this.audioChunks = [];
        this.selectedFile = new File([audioBlob], 'audio_message.mp3', { type: 'audio/mpeg' });
        this.sendFile();
        this.isRecording = false;
      };
    }
  }











  ngAfterViewInit() {
    const toggleButton = document.querySelector('.dark-light') as HTMLButtonElement;
    const colors = document.querySelectorAll('.color');

    colors.forEach(color => {
      color.addEventListener('click', (e) => {
        colors.forEach(c => c.classList.remove('selected'));
        const theme = color.getAttribute('data-color');
        if (theme) {
          document.body.setAttribute('data-theme', theme);
        }
        color.classList.add('selected');
      });
    });

    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  }
  getFormattedDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm');
  }
}
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../core/http/employee.service';
import { Chart } from 'angular-highcharts';
import { CongeService } from '../../../../core/http/conge.service';
import { AbsenceService } from '../../../../core/http/absence.service';
import { forkJoin } from 'rxjs';
import { PublicHoliday } from '../../../../shared/models/publicholiday';
import { PublicHolidayService } from '../../../../core/http/publicholiday.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'
import { Tooltip } from 'bootstrap';
import { AuthService } from '../../../../core/auth/auth.service';
import { QuoteService } from '../../../../core/http/QuoteService.service';
import { MessageService } from 'primeng/api';
import { WeatherService } from '../../../../core/http/WeatherService.service';







@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  @Input() employee: Employee;
  publicHolidays: PublicHoliday[];
  employeeId: number;
  employeeCount: any;
  employeeCountThisYear: any;
  sinceYearText: string;
  absenceCount: any;
  percentageChange: number;
  changeText: string;
  prevyear: string;
  pendingCongeCount: number;
  employees: Employee[];
  averageBaseSalary:number;
  data: any; // Define data property of type ChartData
  options: any; // Define options property of type ChartOptions
  displayEventDialog: boolean = false;
  selectedEvent: any;
  motivationalQuote:any;
  weatherData: any;

  displayMotivationalQuoteDialog: boolean = false;



  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    eventDidMount: (info) => {
      new Tooltip(info.el, {
        title: info.event.title,
        placement: 'top',
        trigger: 'hover',
        container: 'body'
      });
    },
    eventClick: (info) => {
      this.eventClick(info);
    },
    events: []
  };



  constructor(
    private employeeService: EmployeeService,
    private absenceService: AbsenceService, // Instantiate the AbsenceService
    private congeService:CongeService,
    private publicHolidayService:PublicHolidayService,
    private authservice:AuthService,
    private messageService:MessageService,
    private quoteService:QuoteService,
    private weatherService:WeatherService
    
  ) { }

  async ngOnInit(): Promise<void> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.weatherService.getWeatherByCoords(lat, lon).subscribe((weatherData: any) => {
          this.weatherData = weatherData;
          console.log('Weather Data:', JSON.stringify(weatherData)); // Log the entire object as a JSON string
        });
      });
    }
    await this.getListPublicHoliday(); // Wait for public holidays to be fetched
    console.table(this.publicHolidays)
    this.employeeCountThisYear = this.fetchEmployeeCountThisYear();
    this.populateCalendarWithPublicHolidays(); // Call method to populate calendar
    this.generateSinceYearText();
    this.fetchAbsenceCount();
    this.fetchPendingCongeCount();
    this.fetchAverageBaseSalary();
    this.fetchEmployee();
    this.loadCongesData();
    this.getListPublicHoliday();
    this.fetchMotivationalQuote();
    // this.authservice.fetchMotivationalQuote();
    // Get the employee ID from the route parameters
    // this.route.paramMap.subscribe(params => {
    //   this.employeeId = +params.get('id'); // Convert the parameter to a number
    //   this.fetchEmployee(); // Call the method to fetch the employee
    // });
    // this.getList();
  }

  // getList(): void {
  //   this.employeeService.getAllEmployees().subscribe(
  //     (items: Employee[]) => {
  //       this.employees = items.reverse();
  //     }
  //   );
  //   console.log(this.employees)
  // }

  // public fetchMotivationalQuote() {
  //   this.quoteService.getQuotes().subscribe(
  //     (quote) => {
  //       this.motivationalQuote = quote[0]; // Assuming the first quote in the response array
  //       console.log('Motivational Quote:', this.motivationalQuote);
  //       this.showMotivationalQuote();
  //     },
  //     (error) => {
  //       console.error('Error fetching motivational quote:', error);
  //     }
  //   );
  // }

  // public showMotivationalQuote() {
  //   this.messageService.add({
  //     severity: 'info', // You can adjust the severity as needed (info, success, warn, error)
  //     summary: 'Motivational Quote',
  //     detail: `${this.motivationalQuote.q} - ${this.motivationalQuote.a}`, // Assuming q is the quote and a is the author
  //     life: 5000 // Duration in milliseconds (5 seconds)
  //   });
  // }}


  fetchMotivationalQuote(): void {
    this.quoteService.getQuotes().subscribe(
      (quote) => {
        this.motivationalQuote = quote[0];
        this.displayMotivationalQuoteDialog = true; // Open the dialog
      },
      (error) => {
        console.error('Error fetching motivational quote:', error);
      }
    );
  }
  
  closeMotivationalQuoteDialog(): void {
    this.displayMotivationalQuoteDialog = false; // Close the dialog
  }

  populateCalendarWithPublicHolidays(): void {
    const events = this.publicHolidays.map(holiday => ({
      title: holiday.libele,
      date: new Date(Date.UTC(new Date().getFullYear(), holiday.mois - 1, holiday.jour)).toISOString().split('T')[0],
      backgroundColor: '#6266F0',  // Example color
      borderColor: '#6266F0'       // Example border color
    }));
    this.calendarOptions = {
      ...this.calendarOptions,
      events: events
    };
  } 
  formatDate(day: number, month: number): string {
    // Assuming day and month are 1-indexed
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${day} ${monthNames[month - 1]}`;
  }
  
  async getListPublicHoliday(): Promise<void> {
    try {
      const items: PublicHoliday[] = await this.publicHolidayService.getAllPublicHolidays().toPromise();
      console.log(items); // Log public holidays here
      this.publicHolidays = items.reverse();
    } catch (error) {
      console.error('Error fetching public holidays:', error);
    }
    console.log('baad el async',this.publicHolidays)
  }

  eventClick(info) {
    this.selectedEvent = info.event;
    this.displayEventDialog = true;
  }

  fetchAverageBaseSalary(): void {
    this.employeeService.getAverageBaseSalary().subscribe(
      (averageBaseSalary: number) => {
        this.averageBaseSalary = averageBaseSalary;
      },
      error => {
        console.error('Error fetching average base salary:', error);
      }
    );
  }

  fetchEmployeeCountThisYear(): void {
    this.employeeService.getEmployeesAddedThisYear().subscribe(
      (count: number) => {
        this.employeeCountThisYear = count;
        console.log(this.employeeCountThisYear)
      },
      error => {
        console.error('Error fetching employee count:', error);
      }
    );
  }
  formattDate(date: string): string {
    return new Date(date).toLocaleDateString(); // Adjust the formatting as needed
  }


fetchAbsenceCount(): void {
  forkJoin([
    this.absenceService.countAbsencesByYear(new Date().getFullYear() - 1),
    this.absenceService.countAbsencesByYear(new Date().getFullYear())
  ]).subscribe(
    ([prevYearCount, currYearCount]) => {
      console.log(`Previous Year Absence Count: ${prevYearCount}`);
      console.log(`Current Year Absence Count: ${currYearCount}`);
      
      this.absenceCount = currYearCount;
      const diff = currYearCount - prevYearCount;
      if (prevYearCount !== 0) {
        this.percentageChange = Math.round((diff / prevYearCount) * 100);
      } else {
        this.percentageChange = 0; // Handle division by zero
      }
      console.log(`Percentage Change: ${this.percentageChange}`);
      if (diff > 0) {
        this.changeText = `more than last year `;
      } else if (diff < 0) {
        this.changeText = `less than last year `;
      } else {
        this.changeText = 'same as last year';
      }
    },
    error => {
      console.error('Error fetching absence counts:', error);
    }
  );
}



  

  fetchEmployee(): void {
    this.employeeService.getAllEmployees().subscribe(
      (employees: Employee[]) => {
        this.employeeCount = employees.length;
      },
      error => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  generateSinceYearText(): void {
    const currentYear = new Date().getFullYear();
    this.sinceYearText = ` ${currentYear}`;
    const prevyear = new Date().getFullYear() - 1;
    this.prevyear = `${prevyear}`
  }

  fetchPendingCongeCount(): void {
    this.congeService.getPendingCongeCount().subscribe(
      (count: number) => {
        this.pendingCongeCount = count;
      },
      error => {
        console.error('Error fetching pending congé count:', error);
      }
    );
  }
  loadCongesData(): void {
    this.congeService.getCongesPerMonth().subscribe(
      (congesData: { month: string, year: number, congesCount: number }[]) => {
        const currentYearData = congesData.filter(data => data.year === new Date().getFullYear());
        const previousYearData = congesData.filter(data => data.year === new Date().getFullYear() - 1);
  
        const currentYearMonths = currentYearData.map(data => data.month);
        const currentYearCongesCount = currentYearData.map(data => data.congesCount);
  
        const previousYearMonths = previousYearData.map(data => data.month);
        const previousYearCongesCount = previousYearData.map(data => data.congesCount);
  
        this.data = {
          labels: currentYearMonths,
          datasets: [
            {
              label: `${new Date().getFullYear()} Conges Count`,
              backgroundColor: '#6266F0',
              borderColor: '#6266F0',
              data: currentYearCongesCount
            },
            {
              label: `${new Date().getFullYear() - 1} Conges Count`,
              backgroundColor: '#BCBDF9',
              borderColor: '#BCBDF9',
              data: previousYearCongesCount
            }
          ]
        };
  
        this.options = {
          title: {
            display: true,
            text: 'Conges Count Per Month',
            fontSize: 16
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          legend: {
            display: true
          }
        };
      },
      error => {
        console.error('Error fetching conges data:', error);
      }
    );
  }
  

}

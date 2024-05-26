import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { Employee } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../core/http/employee.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { MailingService } from '../../../../core/http/MailingService.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  @ViewChild('form') employeeForm: EmployeeFormComponent;
  private employee: Employee;
  messages: Message[] = [];
  


  constructor(
    private service: EmployeeService,
    private router: Router,
    private messageService: MessageService,
    private mailingService: MailingService, // Inject MailingService

  ) { }

  ngOnInit(): void {
    this.employee = {
      name: '',
      username: '',
      email: '',
      location: '',
      phone: '',
      fax: '',
      password: '',
      roles: '',
      nbEnfant: null,
      regime: '',
      chefDefamille: null,
      salaireDeBASE: null,
      numCompte: '',
      modeDePaiement: '',
      dateRecrutemnt: null,
    };
  }
  navigateToLogin() {
    window.open('http://localhost:4200/', '_blank');
  }


  save() {
    if (this.employeeForm.form.valid) {
      // Extract form values
      const formValues = this.employeeForm.form.value;

      // Create the employee object
      const employee: Employee = {
        name: formValues.name,
        username: formValues.username,
        email: formValues.email,
        location: formValues.location,
        phone: formValues.phone,
        fax: formValues.fax,
        password: formValues.password,
        roles: formValues.roles,
        nbEnfant: formValues.nbEnfant,
        regime: formValues.regime,
        chefDefamille: formValues.chefDefamille,
        salaireDeBASE: formValues.salaireDeBASE,
        numCompte: formValues.numCompte,
        modeDePaiement: formValues.modeDePaiement,
        dateRecrutemnt: formValues.dateRecrutemnt,
        entreprise: { entrepriseId: formValues.entrepriseId },
        category: { category_id: formValues.category },
        groupe: { groupe_id: formValues.groupe },
        grade: { grade_id: formValues.grade }
      };

      console.log('Employee to save:', employee);

      this.service.addEmployee(employee).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'L’employé a été ajouté avec succès.', life: 3000 });

          // Send email when employee is added successfully
          this.sendEmail(employee.email);
          setTimeout(() => {
            this.router.navigate(['/employee/list']);
          }, 3000);
        },
        (error) => {
          console.error('Erreur lors de l’enregistrement de l’employé :', error);
          if (Array.isArray(error)) {
            error.forEach(err => {
              this.messageService.add({ severity: 'error', summary: 'Les champs ne sont pas valides', detail: err.message });
            });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de l’enregistrement de l’employé.' });
          }
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'La forme n’est pas valable.', life: 3000 });
    }
  }
  
  private sendEmail(to: string): void {
    const hamadi = this.employee.name;
    console.log(hamadi)
    const emailData = {
      to: to,
      subject: '{{hamadi}}',
      htmlContent: `
      <!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <title>

    </title>
    <!--[if !mso]><!-- -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        #outlook a {
            padding: 0;
        }

        .ReadMsgBody {
            width: 100%;
        }

        .ExternalClass {
            width: 100%;
        }

        .ExternalClass * {
            line-height: 100%;
        }

        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        p {
            display: block;
            margin: 13px 0;
        }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
        @media only screen and (max-width:480px) {
            @-ms-viewport {
                width: 320px;
            }
            @viewport {
                width: 320px;
            }
        }
    </style>

    <style type="text/css">
        @media only screen and (min-width:480px) {
            .mj-column-per-100 {
                width: 100% !important;
            }
        }
    </style>


    <style type="text/css">
    </style>

</head>

<body style="background-color:#f9f9f9;">
    <div style="background-color:#f9f9f9;">
        <div style="background:#f9f9f9;background-color:#f9f9f9;Margin:0px auto;max-width:600px;">

            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9f9f9;background-color:#f9f9f9;width:100%;">
                <tbody>
                    <tr>
                        <td style="border-bottom:#333957 solid 5px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
        <div style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;">

            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;">
                <tbody>
                    <tr>
                        <td style="border:#dddddd solid 1px;border-top:0px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">

                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:bottom;" width="100%">

                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">

                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                <tbody>
                                                    <tr>
                                                        <td style="width:64px;">

                                                            <img height="auto" src="https://s3.amazonaws.com/appcues-email-assets/images/email-hero-animation.gif" style="border:0;display:block;outline:none;text-decoration:none;width:100%;" width="64" />

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">

                                            <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:bold;line-height:1;text-align:center;color:#555;">
                                                Welcome to Createch
                                            </div>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">

                                            <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:left;color:#555;">
                                                Hello ${hamadi}!<br></br>
                                                Thank you for signing up for {{ product }}. We're really happy to have you! Click the link below to login to your account:
                                            </div>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 25px;padding-top:30px;padding-bottom:50px;word-break:break-word;">

                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                                <tr>
                                                    <td align="center" bgcolor="#2F67F6" role="presentation" style="border:none;border-radius:3px;color:#ffffff;cursor:auto;padding:15px 25px;" valign="middle">
                                                        <p style="background:#2F67F6;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;">
                                                        <a href="localhost:4200/" (click)="navigateToLogin()">Login to Your Account</a>

                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">

                                            <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:20px;text-align:left;color:#525252;">
                                                Best regards,<br><br>Rh<br>Rh name || Admin<br>
                                                <a href="www.createch.tn" style="color:#2F67F6">Createch.tn</a>
                                            </div>

                                        </td>
                                    </tr>

                                </table>

                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>


        <div style="Margin:0px auto;max-width:600px;">

< align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
            
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">

                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                    <tbody>
                                        <tr>
                                            <td style="vertical-align:bottom;padding:0;">

                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">

                                                  

                                                </table>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </td>
                    </tr>
                </tbody>
            </>

        </div>
    </div>

</body>

</html>
      `

    };

    this.mailingService.sendHtmlEmail(emailData).subscribe(
      response => {
        console.log('Email sent successfully:', response);
      },
      error => {
        console.error('Failed to send email:', error);
      }
    );
  }

}
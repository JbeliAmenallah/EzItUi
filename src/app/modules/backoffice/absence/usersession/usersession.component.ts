import { Component } from '@angular/core';
import { AbsenceService } from '../../../../core/http/absence.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { Absence } from '../../../../shared/models/absence';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-usersession',
  templateUrl: './usersession.component.html',
  styleUrl: './usersession.component.css'
})
export class UsersessionComponent {

  absences: Absence[];
  username: string;
  JustifiedAbsencesCount: number;
  NonJustifiedAbsencesCount: number;
  loading: boolean = true;
  absenceCount: number;
  totalDuration = 0;
  totalAbsenceDays = 0;
  data: any;
  uniqueReasons: string[];
  options: any;
  greeting: string;

  constructor(private absenceService: AbsenceService, private authService: AuthService) { }

  ngOnInit() {
    this.username = this.authService.getAuthenticatedUsername();
    this.loadAbsencesByUsername();
    this.setGreeting(); // Call the method to set the greeting

    
  }
  setGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      this.greeting = 'Good Morning';
    } else {
      this.greeting = 'Good Afternoon';
    }
  }
  
  loadAbsencesByUsername() {
    this.absenceService.getAbsencesByUsername(this.username).subscribe(
      (absences) => {
        this.loading = false;
        this.absences = absences;
        this.calculateKPIs();
        this.generateChartData(); // Call method to generate chart data
      },
      (error) => {
        console.error('Error fetching absences:', error);
      }
    );
  }

  generateChartData() {
    this.uniqueReasons = Array.from(new Set(this.absences.map(a => a.reason)));

    this.data = {
      labels: this.uniqueReasons,
      datasets: [
        {
          label: 'Absence Reasons',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: this.uniqueReasons.map(reason => this.absences.filter(a => a.reason === reason).length)
        }
      ]
    };
    this.options = {
      plugins: {
          legend: {
              labels: {
                  fontColor: '#001AFF'
              }
          }
      },
      scales: {
        r: {
          pointLabels: {
              color: '#001AFF',
          },
          grid: {
              color: '#837280',
          },
          angleLines: {
              color: '#56A0EE'
          }
      }
      }
  };
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  calculateKPIs() {
    // Calculate conges count
    this.absenceCount = this.absences.length;
    // Calculate pending, accepted, and rejected conges count
    this.JustifiedAbsencesCount = this.absences.filter(absence => absence.justified === true).length;
    console.log(this.JustifiedAbsencesCount)
    this.NonJustifiedAbsencesCount = this.absences.filter(absence => absence.justified === false).length;
    console.log(this.NonJustifiedAbsencesCount)

    this.absences.forEach(absence => {
      const startDate = new Date(absence.dateDebutAbsence);
      const endDate = new Date(absence.dateFinAbsence);
      const duration = endDate.getTime() - startDate.getTime();
      this.totalDuration += duration;
      console.log(duration)
    });

    // Convert milliseconds to days
    this.totalAbsenceDays = Math.round((this.totalDuration / (1000 * 3600 * 24)));
  }
}

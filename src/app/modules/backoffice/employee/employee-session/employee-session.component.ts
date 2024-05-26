import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { Conge } from '../../../../shared/models/conge';
import { CongeService } from '../../../../core/http/conge.service';
import { Chart } from 'angular-highcharts';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-employee-session',
  templateUrl: './employee-session.component.html',
  styleUrls: ['./employee-session.component.css']
})
export class EmployeeSessionComponent {

  username: string;
  conges: Conge[];
  averageDuration: number;
  congesCount: number;
  pendingCongesCount: number;
  acceptedCongesCount: number;
  rejectedCongesCount: number;
  loading: boolean = true;
  data:any;
  options:any;
  chart:Chart;
  hello:string




  constructor(
    private authService: AuthService,
    private congeService: CongeService
  ) {}

  ngOnInit() {
    this.username = this.authService.getAuthenticatedUsername();
    console.log(this.username);
    this.loadCongesByUsername();
    this.loadCongesStatusData();
    this.setGreeting();
  }

  setGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      this.hello = 'Good Morning';
    } else {
      this.hello = 'Good Afternoon';
    }
  }

  loadCongesByUsername() {
    this.setGreeting();
    this.congeService.getCongesByUsername(this.username).subscribe(
      
      (conges) => {
        this.loading=false;
        this.conges = conges;
        this.calculateKPIs(); // Move calculation inside subscription callback
        this.loadCongesStatusData(); // Call loadCongesStatusData after conges are populated

        console.log('Conges:', this.conges);
      },
      (error) => {
        console.error('Error fetching conges:', error);
      }
    );
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}




  calculateKPIs() {
    // Calculate conges count
    this.congesCount = this.conges.length;

    // Calculate average duration
    const durations = this.conges.map(conge => {
      const startDate = new Date(conge.startDate);
      const endDate = new Date(conge.endDate);
      return Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    });
    this.averageDuration = durations.reduce((sum, duration) => sum + duration, 0) / durations.length;

    // Calculate pending, accepted, and rejected conges count
    this.pendingCongesCount = this.conges.filter(conge => conge.state === 'En attente').length;
    this.acceptedCongesCount = this.conges.filter(conge => conge.state === 'Accepted').length;
    this.rejectedCongesCount = this.conges.filter(conge => conge.state === 'Rejected').length;
  }

  // Method to get the count of pending conges
  getPendingCongesCount(): number {
    return this.pendingCongesCount;
  }

  // Method to get the count of accepted conges
  getAcceptedCongesCount(): number {
    return this.acceptedCongesCount;
  }

  // Method to get the count of rejected conges
  getRejectedCongesCount(): number {
    return this.rejectedCongesCount;
  }

  loadCongesStatusData(): void {
    // Group conges by year and month
    const groupedConges = this.conges.reduce((acc, conge) => {
      const yearMonth = `${new Date(conge.startDate).getFullYear()}-${new Date(conge.startDate).getMonth() + 1}`;
      if (!acc[yearMonth]) {
        acc[yearMonth] = {
          accepted: 0,
          rejected: 0,
          pending: 0
        };
      }
      if (conge.state === 'Accepted') {
        acc[yearMonth].accepted++;
      } else if (conge.state === 'Rejected') {
        acc[yearMonth].rejected++;
      } else {
        acc[yearMonth].pending++;
      }
      return acc;
    }, {});

    // Extract data for chart
    const labels = Object.keys(groupedConges);
    const data = labels.map(label => groupedConges[label]);

    console.log('Data:', data); // Log data to check

    // Prepare data for chart
    this.data = {
      labels: labels,
      datasets: [
        {
          label: 'Accepted',
          backgroundColor: '#4CAF50',
          borderColor: 'rgba(75, 192, 192, 1)',
          data: data.map(item => item.accepted)
        },
        {
          label: 'Rejected',
          backgroundColor: '#F44336',
          borderColor: 'rgba(255, 99, 132, 1)',
          data: data.map(item => item.rejected)
        },
        {
          label: 'Pending',
          backgroundColor: '#FF9800',
          borderColor: 'rgba(255, 205, 86, 1)',
          data: data.map(item => item.pending)
        }
      ]
    };

    console.log('Data before assigning to chart:', this.data); // Log data before assigning to chart

   // Chart options
  this.options = {
  title: {
    display: true,
    text: 'Conges Count Per Month',
    fontSize: 20
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        callback: function(value) {
          if (Number.isInteger(value)) {
            return value;
          }
        }
      }
    }]
  },
  legend: {
    display: true
  }
};

}


}

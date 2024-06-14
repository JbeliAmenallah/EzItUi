import { Component, OnInit } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { PublicHolidayService } from '../../../core/http/publicholiday.service'; 
import { PublicHoliday } from '../../../shared/models/publicholiday';
import { Tooltip } from 'bootstrap';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-public-holiday-calendar',
  templateUrl: './public-holiday-calendar.component.html',
  styleUrls: ['./public-holiday-calendar.component.css']
})
export class PublicHolidayCalendarComponent implements OnInit {
  publicHolidays: PublicHoliday[] = [];
  displayEventDialog: boolean = false;
  selectedEvent: any = {};

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
    events: [],
    height: 'auto', // You can adjust this to a specific pixel value or 'auto' for dynamic height
    
  };
  
  constructor(private publicHolidayService: PublicHolidayService) {}

  ngOnInit(): void {
    this.getListPublicHoliday();
  }

  async getListPublicHoliday(): Promise<void> {
    try {
      const items: PublicHoliday[] = await this.publicHolidayService.getAllPublicHolidays().toPromise();
      this.publicHolidays = items.reverse();
      this.populateCalendarWithPublicHolidays();
    } catch (error) {
      console.error('Error fetching public holidays:', error);
    }
  }

  populateCalendarWithPublicHolidays(): void {
    const events = this.publicHolidays.map(holiday => ({
      title: holiday.libele,
      date: new Date(Date.UTC(new Date().getFullYear(), holiday.mois - 1, holiday.jour)).toISOString().split('T')[0],
      backgroundColor: '#6266F0',
      borderColor: '#6266F0'
    }));
    this.calendarOptions = {
      ...this.calendarOptions,
      events: events
    };
  }

  formatDate(day: number, month: number): string {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${day} ${monthNames[month - 1]}`;
  }

  eventClick(info: any): void {
    this.selectedEvent = info.event;
    this.displayEventDialog = true;
  }
}

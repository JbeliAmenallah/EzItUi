import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: any): string {
    if (!value) return 'N/A';

    const currentTime = new Date().getTime();
    const messageTime = new Date(value).getTime();
    const difference = currentTime - messageTime;

    const minutes = Math.floor(difference / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (minutes < 1) return 'à l\'instant';
    if (minutes < 60) return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    if (days < 30) return `il y a ${days} jour${days > 1 ? 's' : ''}`;
    return `il y a ${months} mois${months > 1 ? 's' : ''}`;
  }
}

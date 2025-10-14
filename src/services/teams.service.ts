import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TeamsService {
  constructor(private configService: ConfigService) {}

  async sendTaskNotification(taskKey: string, taskSummary: string, status: string) {
    const teamsWebhookUrl = this.configService.get<string>('TEAMS_WEBHOOK_URL');
    
    if (!teamsWebhookUrl) {
      console.warn('⚠️ Teams webhook URL no configurada');
      return;
    }

    const message = {
      "@type": "MessageCard",
      "@context": "http://schema.org/extensions",
      "themeColor": status === 'Done' ? "28a745" : "ffc107",
      "summary": `Tarea ${taskKey} actualizada`,
      "sections": [{
        "activityTitle": "📋 Actualización de Tarea",
        "activitySubtitle": `${taskKey}: ${taskSummary}`,
        "facts": [{
          "name": "Estado:",
          "value": status
        }, {
          "name": "Proyecto:",
          "value": "CRM Back Orchestrator"
        }],
        "markdown": true
      }]
    };

    try {
      const response = await fetch(teamsWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      });

      if (response.ok) {
        console.log('✅ Notificación enviada a Teams');
      } else {
        console.error('❌ Error enviando a Teams:', response.statusText);
      }
    } catch (error) {
      console.error('❌ Error conectando con Teams:', error);
    }
  }
}
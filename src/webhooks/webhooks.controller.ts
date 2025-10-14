import { Controller, Post, Body, Headers, HttpCode } from '@nestjs/common';
import { TeamsService } from '../services/teams.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private teamsService: TeamsService) {}
  
  @Post('jira')
  @HttpCode(200)
  async handleJiraWebhook(
    @Body() payload: any,
    @Headers('x-atlassian-webhook-identifier') webhookId: string
  ) {
    console.log('🎣 Webhook de Jira recibido:', {
      webhookId,
      issueKey: payload.issue?.key,
      eventType: payload.webhookEvent,
      status: payload.issue?.fields?.status?.name,
      assignee: payload.issue?.fields?.assignee?.displayName
    });

    // Aquí puedes agregar tu lógica personalizada
    if (payload.webhookEvent === 'jira:issue_updated') {
      const issue = payload.issue;
      const status = issue.fields.status.name;
      
      // Ejemplo: Si la tarea pasa a "Done", notificar a Teams
      if (status === 'Done' || status === 'Terminado') {
        await this.notifyTaskCompletion(issue);
      }
    }

    return { success: true };
  }

  private async notifyTaskCompletion(issue: any) {
    console.log(`✅ Tarea completada: ${issue.key} - ${issue.fields.summary}`);
    
    // Enviar notificación a Teams
    await this.teamsService.sendTaskNotification(
      issue.key,
      issue.fields.summary,
      issue.fields.status.name
    );
  }
}
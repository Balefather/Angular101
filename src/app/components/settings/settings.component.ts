import { Component } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  selectedColor: string;
  loggingEnabled: boolean = false;

  constructor(private configService: ConfigService, private messageService: MessageService) { }

  ngOnInit(){
    this.getLoggingStatus()
  }


  updateColor() {
    this.configService.updateStyle("navbar", this.selectedColor).subscribe();
  }

  getLoggingStatus(): void {
    this.configService.getLoggingEnabledStatus().subscribe(loggingEnabled => {
      this.loggingEnabled = loggingEnabled;
      this.messageService.add(this.loggingEnabled.toString());
    });
  }

  updateLogging(){
    this.configService.updateLogging(this.loggingEnabled)
  }
  test(){
    this.configService.testLoadConfig();
  }
}

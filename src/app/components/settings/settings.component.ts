import { Component } from '@angular/core';
import { ConfigService } from '../../services/config.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  selectedColor: string;

  constructor(private configService: ConfigService) { }

  updateColor() {
    this.configService.updateStyle("navbar", this.selectedColor).subscribe();
  }
  test(){
    this.configService.testLoadConfig();
  }
}

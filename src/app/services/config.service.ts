import { Injectable } from '@angular/core';
import { Observable, of, map, switchMap } from 'rxjs';
import { MessageService } from './message.service';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configFilePath = '../assets/appconfig.json';

  constructor(private messageService: MessageService) {
    var path = require('path');
    this.configFilePath = path.join(__dirname, 'assets/appconfig.json');
  }

  testLoadConfig(){
    try {
      var CONFIG = require(this.configFilePath);
      var navbar = CONFIG.styles.navbar;
      var dbHost = CONFIG.styles.textcolor;
      // additional code here
    } catch (error) {
      console.error("Error loading config file:", error);
    }
  }

  getConfig(): Observable<any> {
    try {
      const config = JSON.parse(fs.readFileSync(this.configFilePath, 'utf-8'));
      this.messageService.add('config loaded');
      return of(config);
    } catch (error) {
      this.messageService.add(`Failed to load config: ${error}`);
      return of(null);
    }
  }

  updateConfig(config: any): Observable<any> {
    try {
      fs.writeFileSync(this.configFilePath, JSON.stringify(config, null, 2));
      this.messageService.add(`Updated config: ${JSON.stringify(config)}`);
      return of(config);
    } catch (error) {
      this.messageService.add(`Failed to update config: ${error}`);
      return of(null);
    }
  }

  updateStyle(setting: string, color: string): Observable<any> {
    this.messageService.add(`trying to update ${setting}: ${color}`);
    return this.getConfig().pipe(
      map((config) => {
        config['styles'][setting] = color;
        return config;
      }),
      switchMap((config) => this.updateConfig(config))
    );
  }
}

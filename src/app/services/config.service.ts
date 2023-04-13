import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, switchMap, catchError } from 'rxjs';
import { MessageService } from './message.service';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  
/*   private configFilePath = 'C:/Users/balef/source/repos/Angular101/Angular101/src/assets/appconfig.json';
 */

  private configFilePath = 'assets/appconfig.json';


  constructor(private http: HttpClient, private messageService: MessageService) {
/*     var path = require('path');
    const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
    this.configFilePath = path.join(__dirname, 'assets/appconfig.json'); */
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
    return this.http.get(this.configFilePath).pipe(
      map((config) => {
        this.messageService.add('config loaded');
        return config;
      }),
      catchError((error) => {
        this.messageService.add(`Failed to load config: ${error}`);
        return of(null);
      })
    );
  }

  updateConfig(config: any): Observable<any> {
    return this.http.put(this.configFilePath, config).pipe(
      map(() => {
        this.messageService.add(`Updated config: ${JSON.stringify(config)}`);
        return config;
      }),
      catchError((error) => {
        this.messageService.add(`Failed to update config: ${error}`);
        return of(null);
      })
    );
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

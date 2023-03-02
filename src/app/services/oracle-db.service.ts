/* import { Injectable } from '@angular/core';
import oracledb from 'oracledb';

@Injectable({
  providedIn: 'root'
})
export class OracleService {
  private connection!: oracledb.Connection;

  constructor() {
    this.connect();
  }

  async connect() {
    try {
      const connectionConfig = {
        user: 'your-username',
        password: 'your-password',
        connectString:
          '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.eu-frankfurt-1.oraclecloud.com))(connect_data=(service_name=g5d3f1a3204885c_xtsqko70datkge0i_medium.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))'
      };

      this.connection = await oracledb.getConnection(connectionConfig);

      console.log('Connected to Oracle database');
    } catch (error) {
      console.error('Error connecting to Oracle database', error);
    }
  }

  async executeQuery(query: string): Promise<oracledb.Result<any>> {
    try {
      const result = await this.connection.execute(query);

      console.log('Query executed successfully');

      return result;
    } catch (error) {
      console.error('Error executing query', error);
      throw error;
    }
  }

  async closeConnection() {
    try {
      await this.connection.close();

      console.log('Disconnected from Oracle database');
    } catch (error) {
      console.error('Error disconnecting from Oracle database', error);
    }
  }
} */
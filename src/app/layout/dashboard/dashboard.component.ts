import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Joboffer} from './joboffer';

import { Md5 } from '../../../../node_modules/md5-typescript/Md5';
import { AngularFireModule } from 'angularfire2';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    fullname: String;
    database;
    public jobsofferlist: Array<any> = [];
    public ob;

    constructor(private db: AngularFireDatabase) {
        this.database = this.db.list('/offertedilavoro/');

        this.database.valueChanges().forEach(el => {
            el.forEach(element => {
                this.ob = new Joboffer(element.titolo, element.luogodilavoro, element.skill, element.annuncio,
                    element.titolodistudio);
                this.jobsofferlist.push(this.ob);
                console.log('Annuncio: ', element.annuncio, ' Luogo di lavoro: ', element.luogodilavoro,
                    ' titolo di studio: ', element.titolodistudio);
            });
        });

        this.fullname = sessionStorage.getItem('SessionName');
        /* console.log('Session dashboard: ', this.fullname); */
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'Annunci Pubblicati',
                text:
                    'Scorri la pagina per visualizzare le offerte di lavoro pubblicate.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {}

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}

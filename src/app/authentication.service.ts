import { Injectable, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
    checkUser = true;

    private status: Subject<boolean> = new Subject<boolean>();
    userStatus$ = this.status.asObservable();

  constructor(public auth: AngularFireAuth, private router: Router, private route: ActivatedRoute ) {
    setTimeout(() => {
      this.status.next(true);
    }, 500);
  }

    login(email: string, password: string): void {
      auth().signInWithEmailAndPassword(email, password).then((success) => {
          console.log('Redirect to homepage');
          localStorage.setItem('currentUser', JSON.stringify(success));
          this.status.next(false);
          this.router.navigate(['/dashboard'], { relativeTo: this.route});
      }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
      });
    }
    logout(): void{
      auth().signOut().then((success) => {
          localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
          this.status.next(true);
      });
    }
}

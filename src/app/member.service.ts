import { Injectable } from '@angular/core';
import { Member } from './member.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";

@Injectable()
export class MemberService {
	members: FirebaseListObservable<any[]>;
  currentMember: Observable<firebase.Member>;
  private memberDetails: firebase.Member = null;

	constructor(private database: AngularFireDatabase, private _firebaseAuth: AngularFireAuth, private router: Router) {
		this.members = database.list('members');

    this.currentMember = _firebaseAuth.authState;

    this.currentMember.subscribe(
      (currentMember) => {
        if (currentMember) {
          this.memberDetails = currentMember;
          console.log(this.memberDetails);
        } else {
          this.memberDetails = null;
        }
      }
    )
	}

	addMember(newMember) {
    const member = this.members.push(newMember);

    const credential = firebase.auth.EmailAuthProvider.credential(newMember.email, newMember.password);
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(newMember.email, newMember.password);
	}

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  isLoggedIn() {
    if (this.memberDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
		this._firebaseAuth.auth.signOut()
			.then((res) => this.router.navigate(['/']));
	}

}

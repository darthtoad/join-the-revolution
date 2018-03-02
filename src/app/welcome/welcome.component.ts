import { Component, OnInit } from '@angular/core';
import { Member } from './../member.model';
import { MemberService } from './../member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [MemberService]
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private memberSerivce: MemberService) { }

  ngOnInit() {
  }

  submitForm(newEmail: string, newPassword: string, name: string, favoriteColor: string, politicalStatement: string) {
    let newMember = new Member(newEmail, newPassword, name, favoriteColor, politicalStatement);
    this.memberSerivce.addMember(newMember);
    this.router.navigate([':id/members/']);
  }

}

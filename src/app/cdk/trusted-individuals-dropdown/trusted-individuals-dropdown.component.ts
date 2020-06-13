import { Component, OnInit } from '@angular/core'
import { TrustedIndividualsService } from 'src/app/core/trusted-individuals/trusted-individuals.service'
import { Delegator } from 'src/app/types/trusted-individuals.endpoint'

@Component({
  selector: 'app-trusted-individuals-dropdown',
  templateUrl: './trusted-individuals-dropdown.component.html',
  styleUrls: [
    './trusted-individuals-dropdown.component.scss',
    './trusted-individuals-dropdown.component.scss-theme.scss',
  ],
  preserveWhitespaces: true,
})
export class TrustedIndividualsDropdownComponent implements OnInit {
  delegators: Delegator[]

  alternativeAccounts = ['test', 'test2']
  constructor(private _trustedIndividuals: TrustedIndividualsService) {
    this._trustedIndividuals.getTrustedIndividuals().subscribe((data) => {
      this.delegators = data.delegators
    })
  }

  ngOnInit(): void {}

  changeAccount() {
    throw new Error('Unimplemented')
  }
}

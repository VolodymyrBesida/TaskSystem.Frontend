import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="branding">
      <h3 class="align-middle m-2"
        >Volodymyr Besida</h3>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}

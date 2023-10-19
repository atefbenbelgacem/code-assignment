@Component({
  selector: 'user-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <h1>Users</h1>

    <section>
      <article
        *ngFor="let user of users; trackBy: trackingFunction"
        [class.selected]="user.id === selectedUserId"
        (click)="selectUser.emit(user.id)"
      >
        <h3>{{ user.fullName }}</h3>
	      <p>{{ user.email }}</p>
      </article>

      <p *ngIf="selectedUser">
        Selected User Name:
        {{ selectedUser?.fullName }}
      </p>
    </section>
  `,
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Input() selectedUserId: number | null = null;
  @Output() selectUser = new EventEmitter<number>();

  trackingFunction(index: number, user: User): number {
    return user.id;
  }

  get selectedUser(): User | undefined {
    return this.selectedUserId
      ? this.users.find((user) => user.id === this.selectedUserId)
      : undefined;
  }
}

// Definition of the User interface
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
}
// data.service.ts
@Injectable({ providedIn: 'root' })
export class dataService {
  private readonly http = inject(HttpClient);
  
  private cache$: Observable<Data[]>;
  readonly data$ = this.getdata();

  private getdata(): Observable<Data[]> {
    if (!this.cache$) {
      this.cache$ = this.http.get<Data[]>('/data').pipe(shareReplay(1));
    }
    return this.cache$;
  }
}

// data.component.ts
@Component({
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
  template: `
    <h1>
      data
      <ng-container *ngIf="data$ | async as data">
        ({{ data.length }})
      </ng-container>
    </h1>

    <ul>
      <li *ngFor="let Data of data$ | async">
        {{ Data.title }}
      </li>
    </ul>
  `
})
export class dataComponent {
  private readonly dataService = inject(dataService);

  readonly data$ = this.dataService.data$;
}

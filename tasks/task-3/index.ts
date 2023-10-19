// songs.actions.ts
export const LOAD_SONGS = '[Songs] Load Songs';
export const LOAD_SONGS_SUCCESS = '[Songs] Load Songs Success';
export const LOAD_SONGS_ERROR = '[Songs] Load Songs Error';

export const loadSongs = createAction(LOAD_SONGS);
export const loadSongsSuccess = createAction(LOAD_SONGS_SUCCESS, props<{ songs: Song[] }>());
export const loadSongsError = createAction(LOAD_SONGS_ERROR, props<{ errorMsg: string }>());

// songs.component.ts
@Component(/* ... */)
export class SongsComponent implements OnInit {
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(loadSongs());
  }
}

// songs.effects.ts
@Injectable()
export class SongsEffects {
  private readonly actions$ = inject(Actions);
  private readonly songsService = inject(SongsService);

  /*
  In a real app for the content of the actions file you can import them as one object 
  example: import * as actions from "songs.actions.ts" (or the destionation of the file)

  P.S: We can use switchMap if you just want the last action to be processed !
  */
  readonly loadSongs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_SONGS),
      withLatestFrom(this.store.select(selectSongs)),
      filter(([action, songs]) => songs === null),
      exhaustMap(() => {
        return this.songsService.getAll().pipe(
          map((songs) => loadSongsSuccess({ songs })),
          catchError((error: HttpErrorResponse) =>
            of(loadSongsError({ errorMsg: error.message }))
          )
        );
      })
    );
  });
}

import { Subject } from 'rxjs'

export class UIService {
  loadingStateCahnged = new Subject<boolean>()
  constructor () {}
}

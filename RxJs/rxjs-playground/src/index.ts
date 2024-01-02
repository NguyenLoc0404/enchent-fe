// import { Observable } from 'rxjs';

// const someObservable$ = new Observable<string>(subscriber => {
//   subscriber.next('Alice');
//   subscriber.next('Ben');
//   subscriber.next('Charlie');
//   subscriber.complete();
// });

// someObservable$.subscribe(value => console.log(value));

import { ajax } from 'rxjs/ajax';
import { filter, Observable, Subscription, UnsubscriptionError, forkJoin, from, fromEvent, interval, observable, of, subscribeOn, timer, map, tap, debounceTime, catchError, EMPTY, Subscriber, concatMap, Subject, BehaviorSubject, withLatestFrom } from 'rxjs';
import {
  name$,
  storeDataOnServer,
  storeDataOnServerError
} from './external';


//Observable are like functions, which generate some values once when we subcribe to them
//Observable has three notifications: next, error, complete
//each observable can run independent
// to fix leak memory call unscribe

//   name$.subscribe( value =>{
//     console.log(value)
//   });

// storeDataOnServer('some value').subscribe( value =>{
//     console.log(value)
//   });

// storeDataOnServerError('some value').subscribe(
//     value => console.log(value),
//     err => console.log('error when saving', err.message)
// );

// storeDataOnServerError('some value').subscribe(
//   //object is observer
//   {
//       next: value => console.log(value),
//       error: err => console.log('error when saving', err.message),
//       complete: () => console.log('complete')
//   }
// );

// const observable$ = new Observable( subscribe => {
//   subscribe.next('Alice');
//   setTimeout(()=> {
//     subscribe.next('Ben');
//   },2000)
//   setTimeout(()=> {
//     subscribe.next('Charlie');
//   },4000)
// })

// const observable$ = new Observable( subscribe => {
//   subscribe.next('Alice');
//   subscribe.next('Ben');
//   setTimeout(()=> {
//     subscribe.next('Charlie');
//     subscribe.complete();
//   },2000)
//   return () => {
//     console.log('Tera down')
//   }
// })

// const observable$ = new Observable( subscribe => {
//   subscribe.next('Alice');
//   subscribe.next('Ben');
//   setTimeout(()=> {
//     subscribe.next('Charlie');
//   },2000)

//   setTimeout(()=> {
//     subscribe.error(new Error('Failure'));
//   },4000)
//   return () => {
//     console.log('Tera down')
//   }
// })

//order lesson

// const observable$ = new Observable( subscribe => {
//   subscribe.next('Alice');
//   subscribe.next('Ben');
//   setTimeout(()=> {
//     subscribe.error(new Error('Failure'));
//   },2000)
//   setTimeout(()=> {
//     subscribe.next('Charlie');
//   },4000)

//   return () => {
//     console.log('Tera down')
//   }
// })

// const observer = {
//   next: (value: any) => console.log(value)
// }
// const subcription = observable$.subscribe(observer)

// setTimeout(()=>{
//   subcription.unsubscribe();
// },3000)
// console.log('subcription 1 start')
// observable$.subscribe(value => console.log("subcription 1",value))

// setTimeout(() => {
//   console.log('subcription 2 start')
// observable$.subscribe(value => console.log("subcription 2",value))
// },2000)

// console.log('before subcribe')
// observable$.subscribe({
//   next: value => console.log(value),
//   complete: () => console.log('Completed'),
//   error: err => console.log(err.message)
// })

// console.log('after subcribe')

//excise 
// const intervalObservable$ = new Observable(subscribe => {
//   let value = 1;
//   const interval = setInterval(() => {
//     subscribe.next(value);
//     value++;
//   }, 2000);
//   return () => {
//     clearInterval(interval);
//   }
// })
// const subcription = intervalObservable$.subscribe({
//   next: value => console.log(value)
// })

// setTimeout(()=> {
//   console.log('unsubscribe')
//   subcription.unsubscribe();
// },7000)


// type observable: hot and cold
//cold observable
//For each new subciption, the observable produced a new set of values independently , new subcription new data

// const ajax$ = ajax<any>('https://random-data-api.com/api/name/random_name');
// ajax$.subscribe((res) => {
//   console.log('res 1',res.response.first_name)
// });

// ajax$.subscribe((res) => {
//   console.log('res 2',res.response.first_name)
// });

// ajax$.subscribe((res) => {
//   console.log('res 3',res.response.first_name)
// });
//hot observable
//all subcription share the same source

// const helloButton = document.getElementById('helloB');
// const helloClick$ = new Observable<any>(subcriber => {
//   helloButton.addEventListener('click', event => {
//     subcriber.next(event);
//   })
// })

// helloClick$.subscribe(res=> console.log('subcription 1',res.type,res.x,res.y))
// helloClick$.subscribe(res=> console.log('subcription 2',res.type,res.x,res.y))
// helloClick$.subscribe(res=> console.log('subcription 3',res.type,res.x,res.y))

//creation function
//of funtion


// of("Alice","Ben","Charlie").subscribe({
//   next: value => console.log(value),
//   complete: () => console.log("completed")
// })

// const YourName$ = new Observable( subcription => {
//   subcription.next('Alice')
//   subcription.next('Ben')
//   subcription.next('Charlie')
//   subcription.complete();
// })

// YourName$.subscribe({
//   next: value => console.log(value),
//   complete: () => console.log("completed")
// })

// function createName(...args: string[]): Observable<string> {
//   return new Observable(subscription => {
//     for (let i = 0; i < args.length; i++) {
//       subscription.next(args[i])
//     };
//     subscription.complete();
//   })
// }

// createName("Alice","Ben","Charlie").subscribe({
//     next: value => console.log(value),
//     complete: () => console.log("completed")
//   })


//from function
// from(["Alice","Ben","Charlie"]).subscribe({
//   next: value => console.log(value),
//   complete: () => console.log('Completed')
// })

// const somePromise = new Promise((resolve,reject) => {
//   // resolve("Resolved")
//   reject('Error')
// })

// somePromise.then(value => console.log(value)).catch(error => console.log(error))

// const observableFromPromise$ = from(somePromise);

// observableFromPromise$.subscribe({
//   next: value => console.log(value),
//   complete: () => console.log('completed'),
//   error: err => console.log(err)
// })


// const observableOfPromise$ = of(somePromise);

// observableOfPromise$.subscribe({
//   next: value => {
//     value.then(res => console.log('value promise',res))
//     .catch(err => console.log(err))
//   },
//   complete: () => console.log("completed"),
//   error: err => console.log(err)
// })

//fromEvent function

// const triggerHelloButton = document.getElementById('helloB');

// const subciptionFromEvent = fromEvent<MouseEvent>(triggerHelloButton,'click').subscribe((event: any) => console.log(event.type,event.clientX, event.clientY))

// setTimeout(() => {
//   console.log('unsubscription')
//   subciptionFromEvent.unsubscribe();
// }, 5000)

// const triggerClick$ = new Observable( subscribe => {
//   const eventHelloButoonFn = (event:MouseEvent) => {
//     console.log('event button callback executed')
//     subscribe.next(event)
//   }
//   triggerHelloButton.addEventListener('click',eventHelloButoonFn);
//   return () => {
//     triggerHelloButton.removeEventListener('click',eventHelloButoonFn)
//   }
// })

// const subciptionTriggerClick = triggerClick$.subscribe({
//   next: (value:any) => console.log(value.type,value.clientX, value.clientY)
// })

// setTimeout(() => {
//   console.log('unsubscription')
//   subciptionTriggerClick.unsubscribe();
// }, 5000)

//timer function

// console.log('app start')

// const timer$ = new Observable(subscription => {
//   const timeout = setTimeout(()=>{
//     console.log('time out')
//     subscription.next(0) ;
//     subscription.complete() ;
//   },2000)
//   return () => {
//     clearTimeout(timeout);
//   }
// })
// // timer(2000).subscribe({
// //   next: value => console.log(value),
// //   complete: () => console.log('completed')
// // })

// const timerSubciption = timer$.subscribe({
//   next: value => console.log(value),
//   complete: () => console.log('completed')
// })

// setTimeout(()=> {
//   console.log('unsubscribe')
//   timerSubciption.unsubscribe();
// },1000)


//interval function

// console.log('app start')

// interval(2000).subscribe({
//   next: value => console.log(value),
//   complete: () => console.log('completed')
// })

// const intervalFn$ = new Observable(subscription => {
//   let number = 0;
//   const interval = setInterval(()=> {
//     console.log('time out')
//     subscription.next(number++);
//   },2000)
//   return () => {
//     clearInterval(interval)
//   }
// })

// const intervalSubciption = intervalFn$.subscribe({
//   next: value => console.log(value),
//   complete: () => console.log('completed')
// })

// setTimeout(()=>{
//   console.log('unsubscribe')
//   intervalSubciption.unsubscribe();
// },7000)

//forkJoin

// const ajaxUser$ = ajax<any>('https://random-data-api.com/api/v2/users');
// const ajaxAddress$ = ajax<any>('https://random-data-api.com/api/v2/addresses');

// forkJoin(ajaxUser$, ajaxAddress$).subscribe({
//   next: value => console.log(value),
//   error: err => console.log(err),
//   complete: () => console.log('completed')
// })

// const observable1$ = new Observable(subscription => {
//   subscription.next('0');
//   return () => {
//   }
// })

// const observable2$ = new Observable(subscription => {
//   subscription.error('Failure');
//   return () => {
//   }
// })

// //in forkJoin , if have only observable emit error, all value of ForJoin Will be error
// forkJoin(observable1$, observable2$).subscribe({
//   next: value => console.log(value),
//   error: err => console.log(err),
//   complete: () => console.log('completed')
// })


//combineLatest 
//in combineLatest , if observalbe 1 have  a, b , c , and observable 2 have e => result is [c,e]


//module operator
//filter

// interface NewsItem {
//   category: 'Business' | 'Sports' | 'Office';
//   content: string
// }

// const newsFeed$ = new Observable<NewsItem>(subscription => {
//   setTimeout(() => { subscription.next({ category: 'Business', content: 'A' }) }, 1000)
//   setTimeout(() => { subscription.next({ category: 'Sports', content: 'B' }) }, 2000)
//   setTimeout(() => { subscription.next({ category: 'Office', content: 'C' }) }, 3000)
//   setTimeout(() => { subscription.next({ category: 'Sports', content: 'D' }) }, 4000)
//   setTimeout(() => { subscription.next({ category: 'Sports', content: 'E' }) }, 5000)
// })

// //pipe method allows us to provide the Pipeable Operators

// const sportFilterNewsFeed$ = newsFeed$.pipe(
//   filter(item => item.category === 'Sports')
// );

// //map
// const sportMapNewsFeed$ = newsFeed$.pipe(
//   map(item => {
//     if(item.category === 'Sports')
//       item.content = 'Hello content ' + item.content;
//     return item
//   })
// );

// sportFilterNewsFeed$.subscribe(res => console.log(res))
// sportMapNewsFeed$.subscribe(res => console.log(res))

//tap
//This operator is best for side effects: actions you want to take in response to values in an observable, without affecting the values themselves.

// of(1,7,3,6,2).pipe(
//   filter(item => item > 5),
//   tap(value => console.log('Spy:',value)),
//   map(value => value*2)
// ).subscribe( res => console.log('OutPut:',res))


//debounceTime
//value of event will appearance after debounceTime

// const sliderInput :HTMLInputElement = document.querySelector('input#slider');

// fromEvent(sliderInput,'input')
// .pipe(
//   debounceTime(2000),
//   map(event => event.target)
// )
// .subscribe(res => console.log(res));

//catchError
// const failingHttpRequest$ = new Observable(subscriber => {
//   setTimeout(() =>{
//     subscriber.error(new Error('TimeOut'))
//   },3000)
// })
// console.log('App Start')
// failingHttpRequest$.
// pipe(
//   catchError(error => of(error.message))
//   // catchError(error => EMPTY)
// ).
// subscribe({
//   next:value => console.log(value),
//   complete: ()=> console.log('completed')
// })

//flattening operators

// const source$ = new Observable(subscriber => {
//   setTimeout(()=> subscriber.next('A'),2000)
//   setTimeout(()=> subscriber.next('B'),5000)
// })
// console.log('App Start')
// source$.
// pipe(
//   concatMap(value => of(1,2).pipe(map(value => value * 2)))
// )
// .subscribe(res => console.log(res))

// const endpointInput: HTMLInputElement = document.querySelector('input#endpoint');
// const fetchButton = document.querySelector('button#fetch');

// function getDataObservable(value :any): Observable<any> {
//   return ajax(`https://random-data-api.com/api/${value}/random_${value}`).pipe(catchError(error => of(error)))
// }

// fromEvent(fetchButton,'click').
// pipe(
//   map(() => endpointInput.value),
// //if concantMap create new inner observable, and this observable return error, after catchError catch error and convert to new observable to this error. Observable of concantMap will work, and dont complete
// //if you call concatMap two, observable two will wait first observable call complete
//   concatMap(value => getDataObservable(value)),
//   // catchError(error => of(error))
// )
// .subscribe({
//   next: value => console.log(value),
//   complete: ()=> console.log('completed'),
//   error: err => console.log(err)
// })

//switchMap 
//if you call switchMap two, observable two will call , and observable first will cancel

//mergeMap
//mergeMap is working similar forkJoin, can help you to discard memory leak



// ===========================subject=====================================================

const emitButton = document.querySelector('button#emit');
const inputElement: HTMLInputElement = document.querySelector('#value-input');
const subscribeButton = document.querySelector('button#subscribe');

const value$ = new Subject<string>();
// fromEvent(emitButton,'click')
// .subscribe(() => {
//   console.log('emitButton click',inputElement.value);
//   value$.next(inputElement.value);
// })

fromEvent(emitButton,'click')
.pipe(map(()=> inputElement.value))
.subscribe(value$)

fromEvent(subscribeButton,'click').subscribe(() => {
  console.log('new subvciption')
  value$.subscribe(value => console.log(value))
})


//=========================behavior subject==================
const loggedInSpan: HTMLElement = document.querySelector('span#logged-in');
const loginButton: HTMLElement = document.querySelector('button#login');
const logoutButton: HTMLElement = document.querySelector('button#logout');
const printStateButton: HTMLElement = document.querySelector('button#print-state');

const isLoggedIn$ = new BehaviorSubject<boolean>(false);
fromEvent(loginButton,'click').subscribe(()=>isLoggedIn$.next(true))

fromEvent(logoutButton,'click').subscribe(()=>isLoggedIn$.next(false))
isLoggedIn$.subscribe(value => {
  loggedInSpan.innerHTML = value.toString();
  logoutButton.style.display = value ? "block" : "none";
  loginButton.style.display = !value ? "block" : "none";
})
fromEvent(printStateButton,'click')
.pipe(
  withLatestFrom(isLoggedIn$)
)
.subscribe(([event, isLoggedIn])=>{
  console.log('User is logged in',isLoggedIn)
})
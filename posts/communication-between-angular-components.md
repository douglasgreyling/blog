---
id: 11
title: Communication Between Angular Components
date: June 29 2020
---

I thought I could go through how to hook Angular components to each other so they can listen to each other listen for specific events. Angular components are able to receive a set of inputs, by decorating properties of the class with the `@Input` decorator, likewise we can set the outputs of a particular component using the `@Output` decorator.

Let’s imagine we’re making a simple party app where we have two components in our app. The one has a button, which when clicked emits a party event. When this event is raised, our second component needs to flash the appropriate message, so we all know what to do.

The one component (let’s call it our `PartyButtonComponent`) is the component which displays the appropriate button. It needs to raise an event, when the button is clicked.
Its controller will look like this:

```javascript
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'party-button',
  templateUrl: './party-button.component.html',
  styleUrls: ['./party-button.component.css']
})
export class PartyButtonComponent  {
  @Output() onParty: EventEmitter<null> = new EventEmitter<null>();

  party() {
    this.onParty.emit();
  }
}
```

And its template will look something like this:

```html
<button class="btn btn-success" type="button" (click)="party()">Party!</button>
```

Here we’ve created our party button component. We’ve created an `onParty` output, which uses an Angular Event Emitter so that Angular can pick up on our events and initiate change detection.

The button in our template will emit the `onParty` event, when the `party` method is called by clicking the button.

Now, in order for our second component (which we’ll call the `PartyTextComponent`) to detect this event, it needs to listen to the `PartyButtonComponent`’s `onParty` event. We can do this like so:

```html
<party-button (onParty)="text.showPartyText()"></party-button>
<party-text #text></party-text>
```

Here we’ve defined our `PartyButtonComponent` and our `PartyTextComponent`. We’ve then defined a template variable called `text`, this creates a reference to `PartyTextComponent` which we can then use to call its `showPartyText()` method when the `onParty()` event is emitted from our `PartyButtonComponent`.

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'party-text',
  templateUrl: './party-text.component.html',
  styleUrls: ['./party-text.component.css']
})
export class PartyTextComponent  {
  private showText: Boolean = false;

  showPartyText () {
    this.showText = !this.showText;
  }
}
```

Here our `PartyTextComponent` is just keeping track of some state which will control whether, or not, the party text should be displayed. I’ll omit the template for this component since a simple directive is all you need to get this working.

But that’s essentially it. This is a great way to allow components to listen to each other. The downside to this approach is that this method only allows us to have components communicate with each other in the template using template variables.

There is a way to bring this code into the controllers of our components, but I’ll leave that for another blog.

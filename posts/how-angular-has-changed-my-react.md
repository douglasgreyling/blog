---
id: 10
title: How Angular Has Changed My React
date: June 12 2020
---

I’ve recently been learning how to develop front end applications using Angular through some online courses. Angular isn’t the first front end framework I’ve dealt with before. I’ve spent a significant amount of time working with React, although I don’t consider myself a React expert… yet.

Whilst I haven’t finished the current Angular course (and book) just yet, I can certainly say that I’ve learnt some valuable lessons from it all. Off the bat, I find that Angular has a steeper learning curve and I feel like that’s due to Angular having a more opinionated view on building components.

React seems a little simpler since it feels like you’re dealing more with plain old Javascript (or Typescript). I found props and state a little easier to grasp than understanding things like Angular’s annotations and dependency injection.

That’s not to say that Angular isn’t a great tool to use. If I had to share one thing which learning Angular has taught me, then it would be separation of concerns.

## What Angular has taught me

What I’m about to share is purely based, on my experience and how I came about learning React and Angular. So, this isn’t some attempt to be a fan boy of one, or the other.

In my experience so far, it appears that Angular does a better job at splitting things out across different files to make things simpler. For example, upon generating a component using `ng g c foo` you get the following files:

```
foo.component.css
foo.component.html
foo.component.ts
foo.component.spec.ts
```

Out the box things are split up and things are kept separate. Our `foo.component.ts` file acts as a type of controller for the component and this differs from React where controller logic could be defined in one class with our markup. With Angular we have an HTML file to build the markup, and a separate CSS file to define some styles which will only apply to this component using (or emulating) the Shadow DOM.

## Style me like one of your French girls

I recently had to fix an annoying issue where we had CSS styling markup which was completely unrelated. The issue occurred because a new bit of code had been shipped into master with some new styling. A new CSS class was defined with the same name as a pre-existing CSS class. Our styles were stuck in a fight to the death to determine who was king.

The Shadow DOM is like a bit of CSS that is scoped to a specific element. You can have the same class names elsewhere in your app, but your Shadow DOM CSS won’t stick its nose in another component’s business. It wasn’t until I played with Angular that I learnt about this and I found this amazing! It’s this experience which lead me to learn about CSS modules. Something React can use to achieve the exact same thing.

## At your service

Another thing Angular casts some great emphasis on is the concept of services. I can’t say that I know all the use cases where this might be useful, but a service is a class containing code which a component might use to query information (when its inserted into the DOM, or when some event is triggered).

Querying data using HTTP is a prime example of something which could be extracted into a service. Our components shouldn’t need to know that we’re using HTTP, they should care about the DATA we get from HTTP.

Our component becomes a little simpler in that our inputs become easier to reason about. There are less things to reason about in the scope of the context or component. The other win (which is equally as large) is that your component is so much easier to test. You don’t have the headache of attempting to mock an HTTP service (at least in your component). Once again, your component becomes slightly more functional. Given X set of inputs, you can assert that it outputs Y in the expected format.

I’ve adopted this same approach when using React. Keep the HTTP stuff out of your component, and then rather give it a service as a prop where the component can query what it needs by calling a set methods. You’ll save yourself so much headache when you need to test things. It’s made testing components so much more enjoyable for me.

## Nothing is perfect

The sad thing is that nothing is without fault. React or Angular in this instance.

I really wish that React had friendlier out-the-box support for things like conditionally adding classes to components, or conditionally showing components (something that Angular does well using class binding and directives).

On the flip side of the coin, I appreciate that reading React code is a little simpler when you’re trying to see what’s a variable and what isn’t, and Angular isn’t quite as consistent in this regard. Angular has this weird quirk where a variable can appear in your HTML using curly braces (which is acceptable since its quite distinct from the rest of the markup), BUT a variable can also appear in your markup in the elements attributes as a string. Good luck debugging that as a noob.

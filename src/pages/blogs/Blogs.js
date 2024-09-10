import React from 'react';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';

const Blogs = () => {
    const data = [
        {
            id: 1,
            question: "When Should You Use Context API?",
            answer: "The Context API in React is a powerful tool that allows developers to share data between components without having to pass props down through every level of the component tree. It's particularly useful when you have data that needs to be accessible by multiple components at different levels of the tree. For example, if you're building an application that supports multiple themes, you could use the Context API to manage the current theme throughout your application. Similarly, if your application requires user authentication, you could use the Context API to manage the user's authentication state throughout your application. Other use cases might include language localization or data management, where you need to fetch data from an API and share it across multiple components. That being said, it's important to consider the tradeoffs of using the Context API, as it can make your code harder to understand and maintain if not used correctly. So, it's always a good idea to carefully evaluate whether or not the Context API is the right tool for the job before implementing it in your React application."
        },
        {
            id: 2,
            question: "What is Custom Hook?",
            answer: "A custom hook is a JavaScript function whose name starts with the word use and that may call other hooks. For example, useFriendStatus below is our first custom Hook: it calls the useFriendStatus Hook inside of it. We keep the naming convention starting with use so that you can tell at a glance that the rules of Hooks apply to it. (Our linter plugin for ESLint is even smart enough to warn you if you break this rule!) We recommend creating custom Hooks in a separate file from the components that use them. Custom Hooks are a convention that naturally follows from the design of Hooks, rather than a React feature."
        },
        {
            id: 3,
            question: "What is useRef Hook? When should you use it?",
            answer: "The useRef Hook is a function that returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component. Generally, useRef is used for accessing DOM nodes or React elements created in the render method. It's also useful for keeping any mutable value around similar to how you'd use instance fields in classes. useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component. A common use case is to access a child imperatively. In the following example, we use useRef to store a reference to a DOM node that we want to focus on. We pass the initial value null to our useRef call. React will set the current property to the DOM node when the component mounts, and we can clear it on unmount. If we wanted to implement this with class components, we would need to add a ref to the DOM node and then set it manually in componentDidMount and componentDidUpdate. This can be a bit confusing because typically refs are set lazily (We only set a ref when we need it.) and in the case of componentDidMount or componentDidUpdate, we might not have access to the DOM node yet. With useRef, the ref object is initialized when the component mounts. We can still set it conditionally based on some props or state, but it doesn't need to be done in componentDidMount or componentDidUpdate. This makes it a bit easier to reason about since you know refs have been set before componentDidMount or componentDidUpdate fires."
        },
        {
            id: 4,
            question: "What is useMemo Hook? When should you use it?",
            answer: "The useMemo Hook is a function that accepts a function and an array of dependencies. useMemo will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render. Remember that the function passed to useMemo runs during rendering. Don't do anything there that you wouldn't normally do while rendering. For example, side effects belong in useEffect, not useMemo. By default, it only shallowly compares complex objects in the array. If you want control over the comparison, you can also provide a custom comparison function as the second argument. The function receives the previous dependencies as the first argument and the next dependencies as the second argument. If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second argument. This tells React that your effect doesn't depend on any values from props or state, so it never needs to re-run. This isn't handled as a special case — it follows directly from how the dependencies array always works. If you pass an empty array ([]), the props and state inside the effect will always have their initial values. While passing [] as the second argument is closer to the familiar componentDidMount and componentWillUnmount mental model, there are usually better solutions to avoid re-running effects too often. Also, don't forget that React defers running useEffect until after the browser has painted, so doing extra work is less of a problem. If you're doing expensive calculations while rendering, you can optimize them with useMemo."
        }
    ]
    return (
        <div className='py-10'>
            <Breadcrumb>
                <h2 className='text-3xl font-bold mb-2'>
                    Blogs
                </h2>
            </Breadcrumb>

            <div className='mt-8'>
                <div className='grid grid-cols-1 gap-4'>
                    {
                        data.map((blog, index) => (
                            <div key={blog.id} className='bg-white border rounded-md p-5'>
                                <h3 className='text-xl font-bold mb-2'>{index + 1} - {blog.question}</h3>
                                <p className='text text-gray-400'>{blog.answer}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Blogs;
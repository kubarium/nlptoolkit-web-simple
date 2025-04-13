# Motivation

The original project, called [NLP Toolkit](https://starlangsoftware.github.io/nlptoolkit-web-simple/), was a great idea, but it did not have the greatest user experience, nor was it easy for a developer to maintain. The codebase was full of duplicate efforts. The UI, most of all, could have used a thick coat of paint.

## Existing Material

The toolkit is designed to help you analyze and understand the structure of natural language. It provides a set of tools for part-of-speech tagging, tokenization, lemmatization, and dependency parsing. The study is done in two languages, Turkish and English. Most pages consist of a few search fields to look up information in relevant datasets. Then, the results are displayed in a table.

## Suggested Improvements

The most important thing is to make the UI more user-friendly. The search fields should be more intuitive and easier to use. Here are other suggested improvements:

- Improve the overall layout and design of the UI to make it more visually appealing.
- Reduce the amount of duplicate code in the codebase to make it easier to maintain and extend.
- Increase page load time ideally by improving file size in data files.

## Method

In order to improve the project, we have taken many interim steps:

- [Design](#design)
- [Framework](#framework)
- [Implementation](#implementation)
- [File Size](#file-size)

### Design

The [UIKit](https://getuikit.com/) was chosen for the visual uplifting part of the project because it is a simple and easy-to-use UI framework.
In fact, the earliest iteration of modernization started off with just including the UIKit over the existing codebase. First order of business was to construct a navigation and give the homepage a more welcoming look.

Next was to change how the search results looked in tables. However, it became clear that sprinkling UIKit's parts over the original code wasn't going to improve much in terms of developer experience. This was due to the fact that the original codebase had visual and code concerns mixed all together. Function calls that should return just the data were returning HTML as well. Thus, while keeping UIKit still an option, we moved on to selecting a framework.

### Framework

The next decision was to choose a framework for the project. The most popular frameworks are React, Vue, and Angular. Among these options, **Vue** was chosen because it is lightweight, easy to learn, and has a large community.

Vue is also a good choice for this project because it is somewhat similar to jQuery as a progressive framework. Future developers can easily adapt to it as opposed to Angular or React, which has a steeper learning curve.

### Implementation

One of the improvements we have made is to reduce the amount of duplicate code in the codebase. This was done by creating a new component for the search fields that are used in most pages and can be reused in all pages.

Similarly, a **search results component** was created since this sort of feedback was missing from the original.

### File Size

The original project had a large number of data files. These files, typically a JSON file but structured as a piece of JavaScript code, were used to store the data that a user might search. A quick decision was made to convert these files into pure JSON files.

Furthermore, in some files, the data structure was completely altered. For example, if a dataset consisted of an array of objects, each object representing a word:

```json
[..., {"word": "Aaliyah", "ner": "PERSON"}, ...]
```
became
```json
{..., "Aaliyah": "PERSON", ...}
```
As a result, we have managed to reduce the file size by 50% on a lot of files. Overall, we have saved 50 MB.

## Future Considerations

Although the project looks day and night different from its initial version, there are a few things that we would like to improve in the future.

- The most important thing is to offload the datasets from front-end to a back-end solution. As it is, data files are still part of the front-end. This was due to the natural progression of the project. In each iteration, we have improved a big aspect of it, and this remains to be the most important item still deserving our attention.
  To that end, we envision that there will be a Node server via which we can do lookups in datasets on the server side.
- Enhance the documentation to make it easier for new developers to understand the codebase and contribute to the project.
- Implement unit tests to ensure the reliability and stability of the application.
- Improve accessibility to ensure the application is usable by people with disabilities.

+++
title = "What's up with vibe coding?"
description = "My unfiltered thoughts on using AI to write code."
date = "2026-10-17"
taxonomies = { tags = ["Software", "AI", "Ramble"] }
+++

# AI and Code

Nowadays AI and software have become so intertwined that its hard to think of software or coding
without thinking of AI. I personally am not opposed to using AI to vibe-code, but I do feel there
are lines that need to be drawn. My experience using AI for coding is quite limited, I used it to
generate SASS styling for the frontend of my app Rejection Roulette and to modify the zolanight
template for my website. A larger part of my exposure has been from Google adding the AI overview
feature. Honestly, that feature has almost entirely replaced StackExchange and even some docs for
me. I'm not fully sure how I feel about that replacement, but it does speed up the search process.

When I first started my job AI was banned due to our government contracts, but eventually the
company got a government compliant AWS hosted AI for us. They then slowly rolled out AI to all teams
for all use cases. In my team, I was asked to be one of two devs that tested it out and devised a
plan for how it could be smartly integrated into out team. This is why I've been thinking a lot
about AI and code, and what made me want to channel those thoughts into a blog post. I want to
present a complete picture on the topic, hopefully without bias, and that includes highlighting the
benefits of AI.

It should be no surprise that one of the benefits of AI in software is speed, but this is a double
edged sword. In collaborative environments, the speed it gives someone when building comes at the
cost of the time it takes another to review the code. These murky benefits are really interesting to
analyze, and oftentimes give some us some of the most valuable insights.

## The Good

One of the benefits of AI that I've seen is the lower barrier to entry for coding projects. More
specifically, the experience level needed to create something with code is quite low with AI, which
makes software more accessible to most people. In many cases you want someone with more experience
developing software, but there are also lots of times where its not necessary.

In the academic world, exposure to Python is becoming significantly more common for all researchers.
However, for most this exposure is typically just writing scripts for data analysis. Without AI, if
a researcher without software engineering experience wanted to make something more technical, they
would need to either find time in their busy schedule to learn how to make it or find someone else
willing to spend the time making it for them. In most cases, neither option is feasible. AI now
empowers that researcher to build something technically challenging quickly and easily, allowing
them to stay focused on their research.

> Suppose Lucy, an experimental physical chemist, is studying vapor deposition. After her deposition
> experiments she performs nano-IR (a technique that takes infrared spectra at nanoscale spatial
> resolution) on the surface. This generates hundreds of IR spectra that map out the chemical
> composition of the surface. Her colleagues all sift through this data by plotting each spectra and
> looking at each png one at a time. Lucy has the idea to make an app that can display a picture of
> the surface and let the user click on regions to see the spectra. Without AI, this would take
> months to learn, build and refine; time that Lucy does not have. With AI, Lucy can simply prompt
> for it and soon after have an app to use to speed up her research. In this case, AI played a
> purely beneficial role in Lucy's research by giving her more tools to accelerate her research.

Outside of academia, this benefit manifests itself through empowering people in non-software roles
to be able to create automation scripts or tools to relieve them of the monotonous parts of their
jobs. At the time of writing this, I truly feel this a benefit of AI. Since the AI is creating a
tool for someone, not software to be maintained, there isn't a need for it to be well written, just
functional. This also doesn't put too much trust in the AI, since the tool is being used by the
person doing their job rather than having the AI do their job for them.

I touched a bit on how the "AI Overview" feature in Google has replaced StackExchange and sometimes
even documentation for certain packages. This can be a benefit when used as a learning tool. In
particular, AI can give you more tailored examples of how to use certain packages for your specific
use case. This speeds up the development process by reducing the amount of time spent search for
explanations of how certain methods work, or how to implement something. Similarly, AI can be useful
for navigating unfamiliar repos. Querying AI about the complex architecture of a repo or where in a
repo a certain task is performed can greatly speed up the initial stages of working in a new repo.

## The Bad

In collaborative settings, which is nearly always the case for professional software engineering,
vibe-coding can often be a selfish act. In these settings writing code is only one part of the
process, after its written someone needs to review it, test it, and finally then merge it into
production. In some cases, AI will do all of these steps, which is an entirely different issue.
Assuming thats not the case, then vibe-coding something with the expectation or knowledge that
another person is going to have to review it feels selfish. This inherently shifts the burden of
your work onto someone else, even worse is that it creates a huge imbalance in the time spent doing
this work.

> At my job I was asked to do code review on something that was fully vibe-coded by someone without
> software experience. I'm not sure how long this took the person to vibe-code, but it took me
> several hours to thoroughly review it. I found a few bits of dangerous code, and significantly
> more unmaintainable practices in the project. My review of the code include all this and some
> recommendations for changes, which seemed to be appreciated by the person that vibe-coded the
> project. They follow-up with me to let me know that AI had implemented my changes, which I was
> happy about but left feeling a bit used. Someone that had not put the effort in to create
> something used my experience to refine it, this imbalance of work left me feeling like I was just
> another tool. When someone asks of you more than they ask of themselves, it ends up feeling like
> you aren't seen as human to this person, but rather a tool. In my situation, I know the person
> didn't see me this way because of how appreciative they were of me and they reassured me that this
> was due to time pressures. They further emphasized to me that they planned on hiring devs to take
> over this, but for now didn't have devs on the project. Despite all of their reassurance, I still
> felt used.

This imbalance can also happen in the reverse, where code that someone spent time thinking about and
writing is reviewed by AI. Although this version does not shift workload onto another person, it
lacks the respect for the person that wrote the code. It indirectly communicates that their code is
not worth the time it would take to review it, which is a different type of selfishness but still an
act of valuing personal time more than the time of another.

<!-- Making people dumber -->

<!-- Losing the creative part of software -->

## The Ugly

An obvious ugly truth of AI is the environmental/societal impact of the data centers. There is
already an extensive amount of writing on this topic, so I won't add more. I just wanted to make
sure to include it since its hard to talk about AI without talking about that.

One ugly truth I think about a lot is how AI usage silos developers even when they are working in a
team. AI is replacing communication or mentorship within engineering teams, which is magnifying the
isolating environment that software engineering already is. This is a murky area, since it can help
avoid the uncomfortable moment where you ask a senior engineer to sacrifice their time to help you
with something. It saves the senior engineer some time and helps the junior do their job without
needing to ask for help. At first glance it might seem benign, but underneath this surface layer
there is the issue of building more division within software engineering teams. Over time this can
erode the cohesion of the team, making the team more uncomfortable for everyone.

> Suppose Jason, a junior dev, is struggling to implement a fix to their code that was suggested by
> Sofia, a senior dev, during code review. With AI, Jason can just talk over the issue he is having
> with AI until he figures out the implementation. Happy with himself, Jason asks Sofia to re-review
> the code with the fixes. Sofia does not feel the fix is exactly what she was hoping for and leaves
> another comment on it. This back and forth might repeat a few times, and might leave Jason feeling
> like Sofia is being pedantic or Sofia feeling like Jason is not qualified. Without AI, Jason would
> ask Sofia for help understanding how he can fix his code. Having heard directly from Sofia, he
> would be able to fix his code and get it approved in the next review. Jason might leave this
> feeling grateful for Sofia and Sofia might feel that Jason is a great learner. Their discussion
> over the code helps them bond and get more aligned on code that is made in their shared codebase.

Another problem AI magnifies in software engineering is the builder mindset. What I mean by builder
mindset is the concept where building something new is often prioritized over maintaining something
that is already built. This is an issue that already exists in the field. The issue stems from the
prevailing preference of developers to build new things, but is often enabled by managers that
praise new features more than bug fixes or general maintenance work. In a professional setting this
praise can result in better performance reviews, raises, or promotions. Now that AI enables any
developer to quickly build out a new feature, combined with the incentives for doing it, the field
ends up dominated by developers shipping new features. Even the best developers ship features with
some amount of tech debt, this is no different for AI models. The result is more code that needs to
be maintained, which no one rewards or enjoys, and more tech debt that needs to be addressed.

<!-- Crushing the spirit of the good engineers out there by the weight of code review -->

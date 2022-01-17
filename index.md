---
layout: default
active: index
---

<div class="card">
{%- capture text -%}

# Apps: simple yet powerful!

Hello, Vincenzo **Scalzi** here!

Have you ever needed an app that just does one simple thing? Me too! Well, here is my contribution with hopefully
exclusive apps and an oath: no added telemetry from my side!

My challenge: offer stateless apps hosted on minimalistic environments. No server to manage, infinitely scalable and
extreme performance! How does it work? Like my [personal website](https://vcz.fr), my [blog](https://blog.vcz.fr) and my [Meetup notes](https://meetups.vcz.fr),
this site is hosted and delivered by [Cloudflare](https://www.cloudflare.com/){:rel="nofollow"}, and uses [Jekyll](https://jekyllrb.com/){:rel="nofollow"}
to generate content! The difference is that it relies on [Cloudflare Workers](https://workers.cloudflare.com/){:rel="nofollow"}.

If you like what you saw, do not forget to [leave some feedback](https://apps.vcz.fr/app/feedback/?appid=hS7YejNaDu6k)
so that I can make the apps better.

Have a nice visit!

{%- endcapture -%}
{{ text | markdownify }}
</div>
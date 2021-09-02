---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---


{% include base_path %}

 {% if site.author.googlescholar or site.author.dblp %}

  You can also find my publications on
  <!--
    If Computer Science Bibliography (dblp) variable active,
    Then add link to authors dblp account
  -->
  {% if site.author.dblp %}
   <a href="{{site.author.dblp}}">my dblp profile</a>
  {% endif %}
  <!--
    If dblp and Scholar variable active,
    Then add the word and between links
  -->
  {% if site.author.googlescholar and site.author.dblp %}
    and
  {% endif %}
  <!--
    If Google Scholar variable active,
    Then add link to authors Google Scholar account
  -->
  {% if site.author.googlescholar %}
   <a href="{{site.author.googlescholar}}"> Google Scholar </a>
  {% endif %}.

 {% endif %}


<h3>Year of Publication</h3>

<ul style="padding-left: 1em;">

{% for post in site.publications reversed  %}
  {% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
  {% capture next_year %}{{ post.next.date | date: "%Y" }}{% endcapture %}
  {% if this_year != next_year %}
<li style="display: inline; float:left; list-style-type: none; margin-right: 1em; margin-bottom: 0em;"><strong><a href="#{{this_year}}">{{this_year}}</a></strong></li>
  {% endif %}
{% endfor %}

</ul>
<div style="clear: both;"></div>

{% for post in site.publications reversed  %}
  {% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
  {% capture next_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}

  {% if forloop.first %}
  <h2 id="{{this_year}}">{{this_year}}</h2>
  <ul class="publications">
  {% endif %}

  {% include publication-item.html %}

  {% if forloop.last %}
  </ul>
  {% else %}
  {% if this_year != next_year %}
  </ul>
  <h2 id="{{next_year}}">{{next_year}}</h2>
  <ul>
  {% endif %}
  {% endif %}
{% endfor %}

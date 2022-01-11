---
title: "Implementing custom IDataReader"
date: "2012-12-12T22:40:00Z"
author: "Borys Generalov"
---

TBD

Recently we've got a challenging task: when our company acquires another company we want to transfer their data into our central data storage, so that we can analyze and use their data. We needed to transfer specified tables and those are pretty large: 100-300 GB per table.

I am going to skip the rest of unnecessary details as they are making things complicated. The solution was to use the .NET Framework with WCF streaming
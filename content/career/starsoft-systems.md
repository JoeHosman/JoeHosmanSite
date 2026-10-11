---
company: "StarSoft Systems"
role: "Director of Technology"
start: "2006"
end: "2014"
summary: "Creating Ticket Attendant and owning the technology operation of a distributed SaaS business serving about 500 customers."
featured: true
draft: false
---

## Turning an inventory problem into a product

Working with business owners and sales, I identified an inventory problem:
listing tickets across multiple marketplaces could lead to the same tickets
being sold twice. I created and commercialized Ticket Attendant to address it,
building a paid product used by 300 customers.

I personally wrote all of its product code from 2007 to 2012, then continued
development alongside a developer hired for the product.

Ticket Attendant detected sales emails and synchronized point-of-sale SQL
inventory across eBay, StubHub, TicketsNow, and SeatGeek using APIs, FTP, and
browser automation. It substantially reduced double-selling in the supported
brokerage workflow and allowed customers to keep inventory listed on
weekends. Delayed sale notifications and nearly simultaneous purchases could
still result in a double sale.

Customers could configure inventory filters and pricing adjustments for each
marketplace. I built wizard-based onboarding and demonstrated the product;
the CEO and CFO owned commercial pricing decisions.

## Operating the wider SaaS business

Beyond Ticket Attendant, I re-architected a fragmented platform into centrally
coordinated distributed C# workers across roughly 100 servers. The platform
served about 500 customers and processed approximately 15,000 jobs per hour
during an 18-hour daily operating window, year-round.

When I first joined the ticket business, the customer website queried separate
MySQL databases across worker applications. I improved connection reuse and
caching, then consolidated job data so customer status could be queried without
opening connections to each worker's database.

The replacement platform separated scheduling from execution: a central
orchestrator assigned work to parallel workers through remote procedure calls.
Weighted scheduling represented customer priorities, while expiring assignments
and shared results coordinated work across the system. I also built operational
dashboards and explored MongoDB and Elasticsearch for logging and analytics.

I owned the business's end-to-end technology operation: product architecture,
software delivery, infrastructure, vendor management, and customer support.
From 2008 to 2012, I built and led a team of up to 10 offshore contract
developers, interviewing and selecting every hire. I also coordinated three
contracted data-entry teams and managed one direct support report.

## Infrastructure and automation

The role extended into data-center migrations, colocation negotiations, server
hardware, multi-site connectivity, and VPN, network, phone, and email
administration.

I installed server hardware, connected offices and data centers through network
tunnels, and configured the Avaya phone system. I integrated Twilio telephony
and Stripe subscription billing, and introduced automated builds and one-click
deployment for client and server tools.

I built automation for ticket-lottery registration, order tracking, electronic
ticket retrieval, and inventory updates. An in-house convolutional neural network
handled image recognition within ticket-automation workflows, with a queued
human-response fallback and worker pause/resume logic.

## Testing changing external systems

I built a Fiddler extension that turned recorded HTTP sessions into test fixtures.
Tests could replay captured responses and compare outgoing requests with the
recorded exchanges, allowing for changing values such as timestamps. This gave
me a repeatable way to test integrations whose external behavior kept changing.

// Stay and hire: the centre building for residential groups and self-programming groups.
import { PageTop, Band, SectionHead, OnThisPage, Split, Ticks, Ledger, Gallery, Facilities, Quotes, Downloads, Callout, CtaBand, Btn, TBC, img, OLD } from '../ui/inner/blocks'
import { href, CONTACT } from '../data'

export function Stay({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Stay and hire"
        lead="A warm stone building at the top of the Castleshaw Valley, with beds for 38, a big lounge, a classroom, a yurt and a camping field. Book it with our activities, or on its own and run your own programme."
        image={{ src: img('stay-front'), alt: 'The front of the Castleshaw Centre, a long stone building beside the lane', shape: 'arch' }}
        actions={<><Btn href={CONTACT}>Check availability</Btn><a className="ib ib-line" href="#facilities">Facilities</a></>}
      />
      <OnThisPage items={[
        { id: 'ways-to-book', label: 'Ways to book' },
        { id: 'facilities', label: 'Facilities' },
        { id: 'food-and-prices', label: 'Food and prices' },
        { id: 'what-groups-say', label: 'What groups say' },
      ]} />
      <Band>
        <SectionHead eyebrow="Stay and hire" title="At a glance" />
        <Ledger items={[
          ['38', 'beds in rooms sleeping 2 to 6'],
          ['17', 'people minimum for accommodation-only bookings'],
          ['1', 'yurt classroom, plus a camping field'],
          ['6', 'kinds of animals to meet, from goats to geese'],
        ]} />
      </Band>

      <Band tone="sky" id="ways-to-book">
        <SectionHead title="Ways to book" />
        <div className="cols cols-2">
          <div className="icard">
            <h3>Residential activity visits</h3>
            <p>Most schools stay with us as part of a residential course, with our tutors leading activities through the day. <a href={href('activities/')}>Activities and school visits</a></p>
          </div>
          <div className="icard">
            <h3>Accommodation only</h3>
            <p>Groups can also book the building to run their own programme. The minimum booking is 17 people, and our staff can add activities by arrangement.</p>
            <p>Running clubs, youth groups and community organisations use it this way, from the Manchester Hash House Harriers to The Proud Trust.</p>
          </div>
        </div>
      </Band>

      <Band id="facilities">
        <Split image={{ src: img('stay-lounge-2'), alt: 'The lounge, with long blue sofas and a large screen' }} heading="Facilities">
          <Facilities items={[
            'Rooms sleeping 2 to 6, some en-suite',
            'Wheelchair accessible ground floor, including bedroom and bathroom',
            'Hoists in one bedroom and bathroom',
            'Central heating and showers',
            'Lounge with a 75-inch smart TV, DVD, wifi, projector and screen',
            'PS4 on request',
            'Dining room',
            'Kitchen for self-catering',
            'Drying rooms',
            'Classroom with projectors and an interactive whiteboard',
            'Yurt: an outdoor classroom and meeting room',
            'Camping field',
            'Garden, play field and children’s adventure trail',
            'Animal and nature areas',
            'Private parking',
            'CCTV',
          ]} />
        </Split>
        <Gallery images={[
          { src: img('stay-dorm'), alt: 'A bedroom with a hand-painted mural on the wall' },
          { src: img('stay-dining'), alt: 'The dining room, with tables and red chairs' },
          { src: img('stay-kitchen'), alt: 'The self-catering kitchen' },
          { src: img('stay-classroom'), alt: 'The classroom with tables and a whiteboard' },
          { src: img('stay-lounge'), alt: 'A sitting area with sofas and a projector screen' },
          { src: img('arch-yurt'), alt: 'Groups on the field beside the yurt' },
          { src: img('stay-bunks'), alt: 'Bunk beds in one of the bedrooms' },
          { src: img('stay-snow'), alt: 'Snow on the moors above the valley, seen past holly on the centre\u2019s fence' },
        ]} />
      </Band>

      <Band tone="sage" id="food-and-prices">
        <SectionHead title="Food and prices" />
        <div className="cols cols-2">
          <div className="icard">
            <h3>Food</h3>
            <p>The kitchen is equipped for groups to cater for themselves.</p>
            <TBC block>Whether the centre can provide catering, and if so, which meals and at what cost.</TBC>
          </div>
          <div className="icard">
            <h3>Prices and availability</h3>
            <p>Call or email with your dates and group size and we will check availability.</p>
            <p><TBC>Prices per night, per person or for the whole building, and any minimum stay</TBC></p>
            <p><TBC>Venue hire for meetings and away days, and day rates for the classroom and yurt</TBC></p>
          </div>
        </div>
        <Callout title="Before you arrive" tone="sky">
          <p>We send a welcome pack and a centre plan when you book. <a href={href('activities/plan-your-visit/') + '#what-to-bring'}>Residential kit list</a></p>
          <Downloads items={[{ title: 'Centre plan with fire exits and alarm points', href: OLD + 'centre_plan_with_fire_exits_and_alarm_points_2019.pdf', meta: 'PDF, 270 KB' }]} />
        </Callout>
      </Band>

      <Band tone="paper" id="what-groups-say">
        <SectionHead title="What groups say" />
        <Quotes items={[
          { text: 'Accommodation is of a good standard and the centre has a welcoming and friendly feel to those staying, and the consistent staff team contributes positively to the experience.', by: 'Learning Outside the Classroom inspection, November 2023' },
          { text: 'Excellent venue in a beautiful location. Great communication throughout.', by: 'Manchester Hash House Harriers, accommodation only' },
          { text: 'Excellent, as in previous years. Centre well laid out in a beautiful setting.', by: 'Leicester Runners, accommodation only' },
        ]} />
      </Band>
      <CtaBand title="Book the building" text="Tell us your dates, group size and whether you would like activities." />
    </>
  )
}

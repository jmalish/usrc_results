#### events:
- user uploads race results via csv
- server parses csv and uploads to database

#### pages:
- index/home page
- login page
- upload page (admin)
- upload confirmation page (admin)
- points pages
    - full season
    - individual race
    - individual driver stats
- points setup (admin)
- api pages as needed

#### upload page:
- file upload input
- select series
- select season

#### upload confirmation page:
- display parsed data in table, does not need to be fancy
- confirm button that submits to db, cancel button that does not

#### user types:
- admin
- driver
    - allow option to highlight driver name on results pages 
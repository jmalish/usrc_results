#### events:
- user uploads race results via csv
- server parses csv and uploads to database

#### pages:
- index/home page x
- login page?
- upload page (admin)
- points pages
    - full season (sessionDetails - all) x
    - individual race (result - one) x
    - individual driver stats (driver - one)
    - current points (currency - all)
- points setup (admin)?

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
    
    
#### points rules:
- Everyone starts with $500

- Incidents:  
      - 0-2:  + $50  
      - 3-4:  + $0  
      - 5-8:  ($25)  
      - 9-12: ($50)  
      - 13+:  ($100)  

- if money <= 0:  
      - driver sits out one race, $200 added to account

- Finishing order:  
      - 1st: + $43  
      - 2nd: + $42  
      - 3rd: + $41  
      - etc

- Other bonuses:  
      - Pole sitter = + $5

- also need a way for admin to manually add bonus points
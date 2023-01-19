```mermaid
erDiagram
  User ||--o{ PostLike : ""
  User ||--o{ PostComment : ""
  User ||--o{ PostBookmark : ""
  User ||--o{ Post : ""
  PostLike }o--|| Post: ""
  PostComment }o--|| Post : ""
  PostBookmark }o--|| Post : ""
  Post ||--|{ Destination : ""
  Destination ||--o{ DestinationImage : ""
  Post ||--o{ PostTagRelation : ""
  PostTagRelation }o--|| PostTag : ""
  User {
    number id PK
    string name
    string email
    string introduction
    string avatar
    string password_digest
    string refresh_jti
  }
  PostLike {
    number id PK
    number user_id FK
    number post_id FK
  }
  PostComment {
    number id PK
    number user_id FK
    number post_id FK
    string post_comment
  }
  PostBookmark {
    number id PK
    number user_id FK
    number post_id FK
  }
  Post {
    number id PK
    number user_id FK
    string title
    string go_wanttogo
    string thumnail_url
    number travel_mode
  }
  Destination {
    number id PK
    number post_id FK
    string place
    text description
  }
  DestinationImage {
    number id PK
    number destination_id FK
    string image_url
  }
  PostTagRelation {
    number id PK
    number post_id FK
    number post_tag_id FK
  }
  PostTag {
    number id PK
    string post_tag
  }
```

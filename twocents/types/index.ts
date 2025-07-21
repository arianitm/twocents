export interface Post {
  uuid: string;
  text: string;
  title: string;
  topic: string;
  author_uuid: string;
  upvote_count: number;
  comment_count: number;
  view_count: number;
  report_count: number;
  author_meta: {
    bio: string;
    age: number;
    gender: string;
    balance: number;
    arena: string;
    subscription_type: 0 | 1 | 2 | 3;
  };
}

export interface Comment {
  uuid: string;
  text: string;
  author_age: string;
  author_gender: string;
  author_location: string;
  net_worth_label: "bronze" | "silver" | "gold" | "platinum";
  children: Comment[];
}

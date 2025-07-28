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
  created_at: string;
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
  author_uuid: string;
  upvote_count: number;
  created_at: string;
  author_meta: {
    age: number;
    gender: string;
    arena: string;
    balance: number;
  };
  net_worth_label: "bronze" | "silver" | "gold" | "platinum";
  children: Comment[];
}

export interface PollOption {
  option: string;
  votes: number;
}

export interface Poll {
  question: string;
  options: PollOption[];
}

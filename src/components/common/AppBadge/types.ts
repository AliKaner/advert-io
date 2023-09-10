export enum BadgeType {
    URGENT = 'Urgent',
}

export interface BadgeProps {
    badgeType: BadgeType;
    text?: string;
    icon?: JSX.Element;
}

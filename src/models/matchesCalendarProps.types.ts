export interface MatchesCalendarProps {
    breadcrumbItems: { title: React.ReactNode; path?: string }[];

    endpoint: string;

    highlightTeamId?: number;

    errorMessages: {
        forbidden: string;
        notFound: string;
        backLink: string;
        backPath: string;
    };
}
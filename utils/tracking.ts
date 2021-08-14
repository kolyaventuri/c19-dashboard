export const pageview = (url: string) => {
  window.gtag('config', process.env.GA_TRACKING_ID!, {
    page_path: url
  });
};

export const trackEvent = ({
  action,
  params
}: {
  action: string;
  params: Record<string, any>;
}) => {
  window.gtag('event', action, params);
};

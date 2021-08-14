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
  if (process.env.NODE_ENV === 'production') {
    window.gtag('event', action, params);
  } else {
    console.log('[TRACK EVENT]', {action, params});
  }
};

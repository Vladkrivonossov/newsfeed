import React, { FC, Fragment, ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../Footer/Footer.css';
import { EmailModal } from '@features/subscribeNotification/components/EmailModal/EmailModal';
import { Dispatch } from '@app/store';
import { fetchCategories } from '@features/categories/actions';
import { fetchSources } from '@features/sources/actions';
import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';

const LS_EMAIL_SHOWN_KEY = 'newsfeed:email_modal_shown';

interface PageProps {
  children?: ReactNode;
}

export const Page: FC<PageProps> = ({ children }) => {
  const dispatch = useDispatch<Dispatch>();
  const [emailModalShown, setEmailModalShown] = useState(!localStorage.getItem(LS_EMAIL_SHOWN_KEY));

  React.useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSources());
  }, []);

  return (
    <Fragment>
      <EmailModal
        shown={emailModalShown}
        onClose={() => {
          localStorage.setItem(LS_EMAIL_SHOWN_KEY, 'true');
          setEmailModalShown(false);
        }}
      ></EmailModal>
      <Header />

      <main>{children}</main>

      <Footer />
    </Fragment>
  );
};

import React from 'react';
import {useNavigate} from 'react-router-dom';
import {IClientsInfo} from '@/api/clients';
import {ROUTES} from '@/constants';

type Props = {
  client: IClientsInfo;
};

export const ClientNameLink = ({client}: Props) => {
  const navigate = useNavigate();

  const handleReloadSingleClient = () => {
    navigate(ROUTES.home.replace(':clientId', String(client?.id)));
  };

  return (
    <div style={{color: '#17a2b8', cursor: 'pointer'}}>
      <p style={{margin: 0, fontWeight: 'bold', fontSize: '14px'}}>
        {client?.fullname}
      </p>
      <i>+{client?.phone}</i>
    </div>
  );
};

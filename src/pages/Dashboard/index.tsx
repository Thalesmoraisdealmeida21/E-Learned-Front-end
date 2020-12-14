/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState, useCallback } from 'react';
import { FiPlay } from 'react-icons/fi';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactPlayer from 'react-player';
import Header from '../../components/header';
import api from '../../services/api';

import {
  ItemList,
  Speeches,
  ContainerDashboard,
  ExpiredContent,
  ConfirmModal,
} from './style';

interface Speeche {
  id: string;
  name: string;
  price: number;
  description: string;
  expired: boolean;
}

interface UserData {
  name: string;
  courses: Speeche[];
}

interface Course {
  limitAccess: DataCue;
  id: string;
  name: string;
}
const Dashboard: React.FC = () => {
  const history = useHistory();
  const [speeches, setSpeeches] = useState<Speeche[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalItem, setModalItem] = useState<string>('');
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    try {
      api.get<Speeche[]>('/users/courses').then(response => {
        if (response) {
          setSpeeches(response.data);
        }
      });
    } catch {
      toast('Voce ainda não possui nenhum curso');
    }
  }, []);

  const handleClickOpen = useCallback(
    async (id: string) => {
      setModalItem(id);

      const response = await api.get<Course>(`/courses/${id}`);
      if (response.data.limitAccess) {
        history.push(`video/${id}`);
      } else {
        setOpenModal(true);
      }
    },
    [history],
  );

  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, []);

  // eslint-disable-next-line consistent-return
  const redirectToVideo = useCallback(async () => {
    try {
      if (!confirm) {
        toast('Concorde com os termos antes de prosseguir', {
          type: 'warning',
        });

        document.getElementById('terms')?.focus();
        return false;
      }
      await api.put('/users/courses', {
        course_id: modalItem,
      });
      history.push(`/video/${modalItem}`);
    } catch (err) {
      toast('Ocorreu um erro', {
        type: 'error',
      });
    }
  }, [history, modalItem, confirm]);
  return (
    <>
      <Header />

      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">
          ATENÇÃO !!!
          <strong color="red"> Assista o video antes de continuar</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ReactPlayer width="100%" url="https://youtu.be/_MDogXtucms" />
            No momento que você confirmar, clicando no botão abaixo. Você tera
            um prazo de 24 hroas para assistir a paletra. Passado este periodo
            não poderá mais acessar o conteúdo
          </DialogContentText>

          <ConfirmModal>
            <p
              onClick={() => {
                setConfirm(!confirm);
              }}
            >
              <Checkbox
                id="terms"
                checked={confirm}
                onChange={() => {
                  setConfirm(!confirm);
                }}
              />
              Li e concordo que, ao prosseguir para a próxima etapa, terei
              acesso à palestra por 24h, tendo a ciência que, passado esse
              período, não terei mais acesso aos estudos.
            </p>
          </ConfirmModal>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={redirectToVideo} color="primary">
            Iniciar minha palestra!
          </Button>
        </DialogActions>
      </Dialog>
      <ContainerDashboard>
        <h1>Minhas Palestras</h1>

        <Speeches>
          {speeches.length <= 0 && (
            <h1>Você ainda não possui nenhuma palestra</h1>
          )}
          {speeches?.map(spc => {
            return (
              <ItemList key={spc.id}>
                <Button disabled={spc.expired} disableRipple type="button">
                  <FiPlay
                    onClick={() => {
                      handleClickOpen(spc.id);
                    }}
                    size={40}
                  />
                </Button>
                <div>
                  <h2>{spc.name}</h2>
                  {/*
                  <p>{spc?.description}</p> */}
                </div>
                <ExpiredContent>
                  {spc.expired ? 'Acesso Expirado' : ''}
                </ExpiredContent>
              </ItemList>
            );
          })}
        </Speeches>
      </ContainerDashboard>
    </>
  );
};

export default Dashboard;

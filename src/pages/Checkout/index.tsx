/* eslint-disable no-useless-escape */
/* eslint-disable camelcase */
import React, {
  useCallback,
  useState,
  useEffect,
  ChangeEvent,
  useRef,
} from 'react';
import pagarme from 'pagarme';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import Radio from '@material-ui/core/Radio';

import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';

// import * as Yup from 'yup';
import * as Yup from 'yup';
import axios from 'axios';
import Input from '../../components/input';

import api from '../../services/api';

import Header from '../../components/header';
import {
  ContainerDashboard,
  CardContainerCheckout,
  InputGroup,
  DetailsPayment,
  PaymentsMethod,
  ContentProfile,
  Section,
  SelectGroup,
  TitleSection,
} from './style';

import { useAuth } from '../../hooks/AuthContext';
import { useCart } from '../../hooks/Cart';
import getValidationErrors from '../../utils/getValidationErros';

interface TransactionStatus {
  status: string;
  refuse_reason: string;
  amount: number;
  payment_method: string;
  boleto_url: string;
  boleto_expiration_date: Date;
  boleto_barcode: string;
}

interface UF {
  sigla: string;
  nome: string;
}

interface City {
  nome: string;
}

interface User {
  name: string;
  email: string;
  telephone: string;
  cep: string;
  city: string;
  address: string;
  neighborhood: string;
  addressNumber: string;
  complement: string;
  cpfCnpj: string;
  uf: string;
}
interface CardData {
  card_holder_name: string;
  card_number: string;
  card_cvv: string;
  card_expiration_date: string;
  amount: number;
  name: string;
  email: string;
  telephone: string;
  cep: string;
  city: string;
  address: string;
  neighborhood: string;
  addressNumber: string;
  complement: string;
  cpfCnpj: string;
  uf: string;
}

interface Order {
  id: string;
  courses: [
    {
      id: string;
      name: string;
      price: string;
    },
  ];
  total: number;
}

const Checkout: React.FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User>({} as User);
  const [paymentMethod, setPaymentMethod] = useState<string>('creditCard');
  const [orderFound, setOrderFound] = useState<Order>({} as Order);
  const { order } = useParams<{ order: string }>();
  const [ufs, setUfs] = useState<UF[]>([]);
  const [installments, setInstallments] = useState('1');

  const [cardExpirationDateMonth, setCardExpirationDateMonth] = useState<
    string
  >('00');
  const [cardExpirationDateYear, setCardExpirationDateYear] = useState<string>(
    '00',
  );

  const formRef = useRef<FormHandles>(null);

  const { courses, clearCart } = useCart();
  const history = useHistory();

  const cpfCnpjMask = useCallback((value: string) => {
    let cpfCnpjFormatted = '';

    cpfCnpjFormatted = value.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/g,
      '$1.$2.$3-$4',
    );

    if (value.length > 11) {
      const newValue = value.replace(/(\.|\/|\-)/g, '');
      cpfCnpjFormatted = newValue.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
        '$1.$2.$3/$4-$5',
      );
    }

    return cpfCnpjFormatted === '' ? value : cpfCnpjFormatted;
  }, []);

  const telephoneMask = useCallback((v: string) => {
    let valFormatted = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
    valFormatted = valFormatted.replace(/^0/, '');

    if (valFormatted.length > 10) {
      valFormatted = valFormatted.replace(
        /^(\d\d)(\d{5})(\d{4}).*/,
        '($1) $2-$3',
      );
    } else if (valFormatted.length > 5) {
      valFormatted = valFormatted.replace(
        /^(\d\d)(\d{4})(\d{0,4}).*/,
        '($1) $2-$3',
      );
    } else if (valFormatted.length > 2) {
      valFormatted = valFormatted.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
    } else {
      valFormatted = valFormatted.replace(/^(\d*)/, '($1');
    }
    return valFormatted;
  }, []);

  useEffect(() => {
    async function getUserData(): Promise<void> {
      try {
        const response = await api.get<User>(`users/${user.id}`);
        setUserData(response.data);
        const responseOrder = await api.get<Order>(`orders/${order}`);
        setOrderFound(responseOrder.data);

        const ufResponse = await axios.get<UF[]>(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados/',
        );

        setUfs(ufResponse.data);
      } catch {
        toast(
          'Ocorreu um erro, por favor atualize a pagina. Se o Erro persistir contate o nosso suporte',
          {
            type: 'error',
          },
        );
      }
    }

    getUserData();
  }, [order, user]);

  const handleChangePaymentMethod = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setPaymentMethod(event.target.value);
    },
    [],
  );

  const handlePay = useCallback(
    async ({
      card_cvv,
      card_expiration_date,
      card_holder_name,
      card_number,
      amount,
      name,
      cpfCnpj,
      neighborhood,
      address,
      addressNumber,
      cep,
      city,
      complement,
      email,
      telephone,
      uf,
    }: CardData) => {
      try {
        let tel = `+${telephone.replace(/[\(\)\.\s-]+/g, '')}`;

        tel = tel.replace('++', '+');

        userData.telephone = tel;

        const coursesIds = courses.map(courseItem => {
          return courseItem.id;
        });
        const items = courses.map(cours => {
          return {
            id: cours.id,
            title: cours.name,
            unit_price: Number(cours.price * 100),
            quantity: 1,
            tangible: false,
          };
        });
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required(
            'Preencha todos os campos, campo nome não foi informado',
          ),
          cpfCnpj: Yup.string()
            .trim()
            .matches(
              /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/,
              'Informe um CPF / CNPJ Válido',
            )
            .required('Informe um CPF / CNPJ'),
          email: Yup.string()
            .email('Informe um e-mail válido')
            .required('Informe um e-mail'),
          cep: Yup.string()
            .trim()
            .min(8, 'Informe um CEP Válido')
            .max(11, 'Informe um CEP Válido'),
          telephone: Yup.string().required(
            'Preencha todos os campos, informe o seu telefone',
          ),
          city: Yup.string().required('Informe sua Cidade'),

          // card_holder_name: Yup.string().required('Informe o nome do cartão'),
          // card_cvv: Yup.string()
          //   .max(3, 'Informe um CVV válido')
          //   .min(3, 'Informe um CVV válido')
          //   .required('Informe o um CVV'),
          // card_number: Yup.string().required('Informe o número do cartão'),
        });
        const client = await pagarme.client.connect({
          api_key: process.env.REACT_APP_PAGARME_ENCRYPTION_KEY,
        });
        await schema.validate(
          {
            card_cvv,
            card_expiration_date,
            card_holder_name,
            card_number,
            amount,
            name,
            cpfCnpj,
            neighborhood,
            address,
            addressNumber,
            cep,
            city,
            complement,
            email,
            telephone,
            uf,
          },
          {
            abortEarly: false,
          },
        );
        // const expirationDate = cardExpirationDateMonth + cardExpirationDateYear;
        const card_hash = await client.security.encrypt({
          card_number,
          card_holder_name,
          card_expiration_date:
            cardExpirationDateMonth + cardExpirationDateYear,
          card_cvv,
        });

        const response = await api.post<TransactionStatus>(
          `/orders/pay/${order}`,
          {
            card_hash: paymentMethod === 'boleto' ? undefined : card_hash,
            amount: amount * 100,
            payment_method: paymentMethod,
            user: userData,
            items,
            installments: paymentMethod === 'boleto' ? '1' : installments,
          },
        );
        if (response.data.boleto_url) {
          window.open(response.data.boleto_url);
        }
        const dataCourse = { userId: user.id, courses: coursesIds };
        if (response.data.status === 'paid') {
          await api.post('/users/courses', dataCourse);
          toast(
            'Pedido Realizado com sucesso. O curso ja este disponivel para você',
            {
              type: 'success',
            },
          );
          history.push('/dashboard');
          clearCart();
        }
        if (response.data.status === 'waiting_payment') {
          toast(
            'Pedido Realizado com sucesso. Após pagamento seu boleto sera processado em no náximo 48 horas',
            {
              type: 'success',
            },
          );
          history.push('/myorders');
          clearCart();
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          const errorsArray = Object.entries(errors);
          errorsArray.map(error => {
            toast(error[1], {
              type: 'error',
            });

            return null;
          });
        } else {
          toast(
            'Ocorreu um erro ao efetuar a transação. Por favor verifique os campos informados ',
            {
              type: 'error',
            },
          );
        }
      }
    },
    [
      paymentMethod,
      order,
      userData,
      cardExpirationDateYear,
      cardExpirationDateMonth,
      history,
      clearCart,
      user.id,
      courses,
      installments,
    ],
  );

  return (
    <>
      <Header position={3} />

      <ContainerDashboard>
        <CardContainerCheckout>
          <Form ref={formRef} onSubmit={handlePay}>
            <ContentProfile>
              <Section>
                <TitleSection>Dados Gerais</TitleSection>

                <Input
                  label="Nome"
                  value={userData.name}
                  id="name"
                  name="name"
                  type="text"
                  onChange={evt => {
                    setUserData({ ...userData, name: evt.target.value });
                  }}
                />

                <Input
                  value={userData.cpfCnpj}
                  label="CPF / CNPJ"
                  name="cpfCnpj"
                  type="text"
                  onChange={evt => {
                    setUserData({
                      ...userData,
                      cpfCnpj: cpfCnpjMask(evt.target.value),
                    });
                  }}
                />

                <InputGroup>
                  <Input
                    value={userData.cep}
                    label="CEP"
                    name="cep"
                    type="text"
                    onChange={evt => {
                      setUserData({
                        ...userData,
                        cep: evt.target.value,
                      });
                    }}
                  />

                  <Input
                    value={userData.telephone}
                    label="Telefone"
                    name="telephone"
                    placeholder="(DD) 9999-9999"
                    type="text"
                    onChange={evt => {
                      setUserData({
                        ...userData,
                        telephone: telephoneMask(evt.target.value),
                      });
                    }}
                  />

                  <Input
                    value={userData.email}
                    label="E-mail"
                    name="email"
                    type="email"
                    onChange={evt => {
                      setUserData({
                        ...userData,
                        email: evt.target.value,
                      });
                    }}
                  />
                </InputGroup>
              </Section>
              <Section>
                <TitleSection>Endereço</TitleSection>

                <InputGroup>
                  <SelectGroup style={{ width: '100px' }}>
                    <span style={{ marginLeft: '10px' }}>UF</span>
                    <div style={{ flex: 1, width: '150px' }}>
                      <select
                        placeholder="UF"
                        style={{ width: '80px' }}
                        name="uf"
                        id="uf"
                        onChange={evt => {
                          setUserData({ ...userData, uf: evt.target.value });
                        }}
                      >
                        {ufs.map(uf => (
                          <option
                            selected={uf.sigla === userData.uf}
                            value={uf.sigla}
                          >
                            {uf.sigla}
                          </option>
                        ))}
                      </select>
                    </div>
                  </SelectGroup>
                  <div style={{ flex: 1 }}>
                    <span style={{ marginLeft: '15px' }}>Cidade</span>
                    <Input
                      style={{ width: '100%' }}
                      name="city"
                      id="city"
                      value={userData.city}
                      onChange={evt => {
                        setUserData({ ...userData, city: evt.target.value });
                      }}
                    />

                    {/* <Input
                      value={userData.city}
                      label="Cidade"
                      name="city"
                      type="text"
                      onChange={evt => {
                        setUserData({ ...userData, city: evt.target.value });
                      }}
                    /> */}
                  </div>
                </InputGroup>

                <InputGroup>
                  <Input
                    value={userData.address}
                    label="Endereço"
                    name="address"
                    type="text"
                    onChange={evt => {
                      setUserData({ ...userData, address: evt.target.value });
                    }}
                  />

                  <Input
                    value={userData.neighborhood}
                    label="Bairro"
                    name="neighborhood"
                    type="text"
                    onChange={evt => {
                      setUserData({
                        ...userData,
                        neighborhood: evt.target.value,
                      });
                    }}
                  />
                </InputGroup>

                <InputGroup>
                  <Input
                    value={userData.addressNumber}
                    label="Número"
                    name="addressNumber"
                    type="text"
                    onChange={evt => {
                      setUserData({
                        ...userData,
                        addressNumber: evt.target.value,
                      });
                    }}
                  />

                  <Input
                    value={userData.complement}
                    label="Complemento"
                    name="complement"
                    type="text"
                    onChange={evt => {
                      setUserData({
                        ...userData,
                        complement: evt.target.value,
                      });
                    }}
                  />
                </InputGroup>
              </Section>
            </ContentProfile>
            <Section>
              <TitleSection>Pagamento</TitleSection>
              <PaymentsMethod>
                <Radio
                  value="boleto"
                  onChange={handleChangePaymentMethod}
                  checked={paymentMethod === 'boleto'}
                />
                Boleto
                <Radio
                  value="creditCard"
                  onChange={handleChangePaymentMethod}
                  checked={paymentMethod === 'creditCard'}
                />
                Cartão de Crédito{' '}
              </PaymentsMethod>
              {paymentMethod === 'creditCard' && (
                <>
                  <span>Pagar em</span>
                  <div>
                    <select
                      placeholder="Mes de Vencimento"
                      name="installments"
                      onChange={evt => {
                        setInstallments(evt.target.value);
                      }}
                      id="installments"
                    >
                      <option selected value="1">
                        1x
                        {Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(orderFound.total)}
                      </option>
                      <option value="2">
                        2x{' '}
                        {Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(orderFound.total / 2)}
                      </option>
                    </select>
                  </div>
                  <Input
                    label="Nome (Igual do Cartão)"
                    id="card_holder_name"
                    name="card_holder_name"
                    type="text"
                  />
                  <Input
                    label="Numero do Cartão"
                    id="card_number"
                    name="card_number"
                    type="number"
                  />
                  <InputGroup>
                    <SelectGroup>
                      <span>Vencimento do Cartão</span>
                      <div>
                        <select
                          placeholder="Mes de Vencimento"
                          onChange={evt => {
                            setCardExpirationDateMonth(evt.target.value);
                          }}
                        >
                          <option>Mes</option>
                          <option value="01">1</option>
                          <option value="02">2</option>
                          <option value="03">3</option>
                          <option value="04">4</option>
                          <option value="05">5</option>
                          <option value="06">6</option>
                          <option value="07">7</option>
                          <option value="08">8</option>
                          <option value="09">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>

                        <select
                          onChange={evt => {
                            setCardExpirationDateYear(evt.target.value);
                          }}
                        >
                          <option>Ano</option>
                          <option value={20}>20</option>
                          <option value={21}>21</option>
                          <option value={22}>22</option>
                          <option value={23}>23</option>
                          <option value={24}>24</option>
                          <option value={25}>25</option>
                          <option value={26}>26</option>
                          <option value={27}>27</option>
                          <option value={28}>28</option>
                          <option value={29}>29</option>
                          <option value={30}>30</option>
                          <option value={31}>31</option>
                        </select>
                      </div>
                    </SelectGroup>

                    <Input
                      label="CVV"
                      id="card_cvv"
                      maxLength={3}
                      name="card_cvv"
                      type="string"
                    />
                  </InputGroup>{' '}
                </>
              )}

              <DetailsPayment>
                <strong>
                  Total a Pagar:
                  <Input
                    id="amount"
                    name="amount"
                    value={Number(orderFound.total)}
                    style={{
                      display: 'none',
                    }}
                    disabled
                  />
                  {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(orderFound.total)}
                </strong>

                <button type="submit">Pagar</button>
              </DetailsPayment>
            </Section>
          </Form>
        </CardContainerCheckout>
      </ContainerDashboard>
    </>
  );
};

export default Checkout;

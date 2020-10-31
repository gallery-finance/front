import React, {useContext, useState} from 'react'
import Web3 from 'web3'
import {BackButton} from "../../components/BackButton";
import {useMyGLFStaking} from "./Hooks";
import {formatAmount} from "../../utils/format";
import {
  HANDLE_SHOW_CONNECT_MODAL,
  HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
  HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
  REQUESTING_DATA, waitingForApprove,
  waitingForConfirm, waitingForInit,
  waitingPending
} from "../../const";
import {
  FailedTransactionModal,
  StakedTokensModal,
  StakeModal,
  UnstakedTokensModal,
  UnstakeModal
} from "../../components/Modals";
import {mainContext} from "../../reducer";
import {getContract, useActiveWeb3React} from "../../web3";
import StakingScore from "../../web3/abi/StakingScore.json";

import {
  getBotAddress,
  getBotStakingAddress,
  getGalleryAddress,
  getGLFStakingAddress,
  getStakingScoreAddress
} from "../../web3/address";
import ERC20 from "../../web3/abi/ERC20.json";
import {useGLFBalance} from "../Hooks";
import {GLFRedIcon} from "../../icons/GLFRedIcon";
import {GLFLightIcon} from "../../icons/GLFLightIcon";

const {toWei, fromWei} = Web3.utils


export const StakingGLF = () => {

  const {account, active, library, chainId} = useActiveWeb3React()

  const {glfStakedAmount, glfRewards} = useMyGLFStaking()
  const {glfBalance} = useGLFBalance()

  const {dispatch, state} = useContext(mainContext);
  const {showFailedTransactionModal} = state
  const [staking, setStaking] = useState(false)
  const [unStaking, setUnStaking] = useState(false)
  const [claiming, setClaiming] = useState(false)
  const [staked, setStaked] = useState(false)
  const [unStaked, setUnStaked] = useState(false)
  const [claimed, setClaimed] = useState(false)
  const [amount, setAmount] = useState()
  const [txHash, setTxHash] = useState('')


  const onLaunch = async () => {
    console.log('on stake launch')
    if (!amount) {
      return
    }
    const tokenContract = getContract(library, ERC20.abi, getGLFStakingAddress(chainId))
    const contract = getContract(library, StakingScore.abi, getStakingScoreAddress(chainId))
    const weiAmount = toWei(amount, 'ether');

    console.log('starting Staking glf', account, weiAmount)
    dispatch({
      type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
      showWaitingWalletConfirmModal: waitingForApprove
    });
    try {
      const result = await tokenContract.methods.approve(
          getStakingScoreAddress(chainId),
          weiAmount,
      )
          .send({from: account});
      dispatch({
        type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
        showWaitingWalletConfirmModal: waitingForConfirm
      });
      console.log('approve status', result.status)
      if (result.status) {
        await contract.methods.stake(weiAmount)
            .send({from: account})
            .on('transactionHash', hash => {
              setTxHash(hash)
              dispatch({
                type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                showWaitingWalletConfirmModal: {...waitingPending, hash}
              });
            })
            .on('receipt', (_, receipt) => {
              console.log('BOT staking success')
              setStaking(false)
              setStaked(true)
              dispatch({
                type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                showWaitingWalletConfirmModal: waitingForInit
              });
            })
            .on('error', (err, receipt) => {
              console.log('BOT staking error', err)
              dispatch({
                type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
                showFailedTransactionModal: true
              });
              dispatch({
                type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                showWaitingWalletConfirmModal: waitingForInit
              });
            })
      } else {
        dispatch({
          type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
          showFailedTransactionModal: true
        });
        dispatch({
          type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
          showWaitingWalletConfirmModal: waitingForInit
        });
      }
    } catch (err) {
      dispatch({
        type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
        showWaitingWalletConfirmModal: waitingForInit
      });
      if (err.code === 4001) {
        dispatch({
          type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
          showFailedTransactionModal: true
        });
      } else {
        dispatch({
          type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
          showFailedTransactionModal: true
        });
      }
      console.log('err', err);
    }
  };


  const onUnStake = async () => {
    console.log('on unstake launch')
    if (!amount) {
      return
    }
    const contract = getContract(library, StakingScore.abi, getStakingScoreAddress(chainId))
    const weiAmount = toWei(amount, 'ether');

    console.log('starting unStaking glf', account, weiAmount)
    dispatch({
      type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
      showWaitingWalletConfirmModal: waitingForConfirm
    });
    try {
      await contract.methods.withdraw(weiAmount)
          .send({from: account})
          .on('transactionHash', hash => {
            setTxHash(hash)
            dispatch({
              type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
              showWaitingWalletConfirmModal: {...waitingPending, hash}
            });
          })
          .on('receipt', (_, receipt) => {
            console.log('glf staking success')
            setUnStaking(false)
            setUnStaked(true)
            dispatch({
              type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
              showWaitingWalletConfirmModal: waitingForInit
            });
          })
          .on('error', (err, receipt) => {
            console.log('glf staking error', err)
            dispatch({
              type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
              showFailedTransactionModal: true
            });
            dispatch({
              type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
              showWaitingWalletConfirmModal: waitingForInit
            });
          })

    } catch (err) {
      dispatch({
        type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
        showWaitingWalletConfirmModal: waitingForInit
      });
      if (err.code === 4001) {
        dispatch({
          type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
          showFailedTransactionModal: true
        });
      } else {
        dispatch({
          type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
          showFailedTransactionModal: true
        });
      }
      console.log('err', err);
    }
  };


  return (
      <article className="center">
        <BackButton toHome />

        <header className="head-page">
          <h1 className="head-page__title h1">Artworks Pool</h1>
        </header>

        <div className="statistics">

          <div className="statistics__list">

            <div className="statistics__item column">

              <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="70" height="70">
                  <circle cx="35" cy="35" r="35" fill="#C4C4C4"/>
                </mask>
                <g mask="url(#mask0)">
                  <circle cx="35" cy="35" r="35" fill="#3B364A"/>
                  <path d="M18.5038 51.4959C18.0735 51.7828 15.9218 53.2172 13.4833 55.3689C12.5575 56.3719 12.0488 58.0943 12.0488 59.6721C8.03245 61.8238 8.03248 66.4139 7.74559 67.2746C7.4587 68.1352 16.9259 71.8647 34.9997 71.5779C53.0735 71.291 68.7087 68.4221 69.139 67.2746C69.5694 66.127 67.2743 61.9672 66.2702 59.6721C65.2661 57.377 62.7852 56.4696 59.3849 53.2172C56.0857 50.0615 53.7906 47.7664 53.0734 45.7582C52.4997 44.1516 52.4997 41.7418 52.6431 41.3115C52.7866 40.8811 51.7825 37.7254 51.3521 36.7213C50.9218 35.7172 51.4956 34.4262 51.3521 32.1311C51.2087 29.8361 50.348 32.7049 49.6308 23.668C48.9691 15.3302 46.762 13.0533 45.0407 11.1885C43.3194 9.32377 42.3153 7.74591 36.0038 6.74181C29.6923 5.73771 27.6841 7.88936 25.8193 9.18034C23.9546 10.4713 22.9505 14.4877 20.6554 17.6434C18.3603 20.7992 18.6472 23.5246 19.221 24.3853C19.221 24.959 18.5038 26.1066 17.6431 31.8443C16.7825 37.582 19.0775 41.3115 20.2251 43.0328C20.7988 43.8934 19.5079 46.4754 18.5038 47.9098C17.4997 49.3443 18.0734 51.0656 18.5038 51.4959Z" fill="black"/>
                  <path d="M31.4136 7.74594C30.8846 7.48145 29.6923 11.0451 29.5489 11.4754C27.8276 11.9536 25.0542 12.4795 24.098 13.914C22.9506 15.6353 22.2231 22.3771 23.2374 22.3771C24.2415 22.3771 27.3973 22.0902 27.8276 23.3812C27.7798 23.2856 27.1104 22.9509 26.1062 22.8074C25.1971 22.6775 23.3809 24.0984 24.385 23.8115C25.1883 23.582 26.6801 23.3812 27.2538 23.6681C27.1103 24.0506 26.9956 24.7009 26.5366 24.8156C25.9629 24.959 25.6429 23.6238 25.2456 23.955C24.385 24.6722 23.5243 24.4809 22.8071 24.5287C22.6637 25.6763 22.6637 28.832 22.9505 30.9836C23.3112 33.6889 25.5323 37.1517 27.2537 38.2992C28.975 39.4468 32.848 39.8771 34.8563 39.5902C35.4418 39.5066 37.7251 38.2992 39.303 37.4386C40.3183 36.8848 40.594 33.7091 40.594 32.8484C40.594 31.9877 39.8767 32.1312 39.7333 30.6968C39.5898 29.2623 40.594 26.1066 40.594 25.3894C40.594 24.8156 40.7852 20.847 40.8809 18.9345C40.068 18.1216 38.1553 16.0656 36.4341 14.3443C34.709 12.6191 31.5571 11.6189 30.1227 11.4754C30.1227 9.8805 31.7005 7.88938 31.4136 7.74594Z" fill="white"/>
                  <path d="M34.7129 21.9468C32.4178 21.9468 31.2703 23.3812 30.9834 24.0984L31.5572 23.955C31.9397 23.5246 33.049 22.6353 34.426 22.5205C35.8031 22.4058 36.5298 22.9509 36.7211 23.2378C36.5298 23.2378 35.8604 23.2091 34.7129 23.0943C33.5654 22.9796 33.0872 23.6203 32.9916 23.955L34.426 23.5246C34.3304 23.8593 34.3113 24.5574 34.9998 24.6722C35.6883 24.7869 35.9561 24.2419 36.0039 23.955C36.7211 23.955 38.2129 23.8976 38.4424 23.6681C38.6719 23.4386 38.7293 22.9987 38.7293 22.8074C38.3468 22.5205 37.008 21.9468 34.7129 21.9468Z" fill="#1D1D1D"/>
                  <path d="M28.8313 40.1642C30.5526 40.3554 33.7084 40.5283 35.2862 40.1642C37.151 39.7339 38.5854 38.8254 39.5895 38.4429C39.8285 39.3992 40.3927 41.4552 40.737 42.0289C41.1673 42.7462 41.8845 43.6068 41.5977 44.6109C41.3108 45.615 40.8786 48.6807 41.3108 49.6314C42.0281 51.2093 40.5936 59.0986 40.737 59.3855C40.8804 59.6724 44.61 55.9429 47.3354 54.9388C50.0608 53.9347 52.6427 52.9306 55.0813 52.6437C54.5391 53.1859 52.2412 54.5 51.2398 55.0212C52.7959 54.5904 57.4312 54.4198 57.8067 54.7953C58.237 55.2257 52.6427 55.3691 45.9009 59.0986C40.5075 62.0822 35.9078 65.1232 34.2821 66.2707L37.151 62.8281C33.6606 62.9716 25.9669 62.2899 23.237 60.8199C21.3724 59.8158 19.5075 58.238 21.0854 54.7953C21.3008 54.3252 22.2498 54.9619 23.237 54.2216C24.3846 53.3609 24.528 50.2052 24.9584 49.9183C25.3887 49.6314 29.8354 46.3322 30.4091 45.4716C30.9829 44.6109 30.4091 41.7421 30.2657 41.4552C30.1509 41.2257 29.2616 40.4989 28.8313 40.1642Z" fill="white"/>
                  <path d="M27.6834 31.1271C27.5687 31.0124 27.6356 30.6012 27.6834 30.4099C27.6356 30.3621 27.5113 30.2952 27.3965 30.4099C27.2531 30.5534 27.54 31.7009 27.6834 31.8444C27.8269 31.9878 28.4006 32.4181 30.1219 32.2747C31.8432 32.1312 32.1301 31.2706 32.2736 30.9837C32.3883 30.7542 31.9389 30.3143 31.6998 30.123C31.652 30.3621 31.499 30.8976 31.2695 31.1271C30.9826 31.414 30.9826 30.9837 30.2654 30.9837C29.5482 30.9837 29.4047 31.5575 28.9744 31.7009C28.5441 31.8444 27.8269 31.2706 27.6834 31.1271Z" fill="#1D1D1D"/>
                  <path d="M32.9908 33.8526H27.5399C27.9225 34.0438 29.0317 34.4263 30.4088 34.4263C31.7858 34.4263 32.7039 34.0438 32.9908 33.8526Z" fill="#1D1D1D"/>
                  <path d="M30.9826 35.5739H29.2613C29.2613 35.7173 29.4334 36.0042 30.1219 36.0042C30.8105 36.0042 30.9826 35.7173 30.9826 35.5739Z" fill="#1D1D1D"/>
                </g>
              </svg>


              <dl className="statistics__dl">

                <div className="statistics__dl-column">
                  <dt className="statistics__dl-dt">
                    {glfRewards ? formatAmount(glfRewards) : REQUESTING_DATA}
                  </dt>
                  <dd className="statistics__dl-dd">
                    GLF Earned
                  </dd>
                </div>

              </dl>

              <a className="statistics__btn btn" onClick={() => {
                // if (!active) {
                //   dispatch({
                //     type: HANDLE_SHOW_CONNECT_MODAL,
                //     showConnectModal: true
                //   });
                //   return
                // }
                // setClaiming(true)
              }}>
                Claim Points
              </a>

            </div>

            <div className="statistics__item column">
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="35" cy="35" r="35" fill="#2B6BDA"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M52.7543 25.6998V24.3477H48.5138C46.6154 24.3477 44.8533 25.2817 43.8001 26.8465L38.7674 34.3237H29.0774V35.6759H37.8574L33.3297 42.4031C32.5305 43.5908 31.1928 44.2998 29.7518 44.2998H28.0012C22.824 44.2998 18.6122 40.1277 18.6122 34.9997C18.6122 29.8718 22.824 25.6998 28.0012 25.6998H39.0686V24.3477H28.0012C22.0714 24.3477 17.2471 29.1262 17.2471 34.9998C17.2471 40.8735 22.0714 45.652 28.0012 45.652H29.7518C31.6503 45.652 33.4123 44.718 34.4655 43.1532L39.4981 35.6759H48.6421V34.3237H40.4081L44.9358 27.5966C45.7353 26.4089 47.0729 25.6998 48.5138 25.6998H52.7543Z" fill="white" stroke="white"/>
              </svg>


              <div className="statistics__dl-column">
                <dt className="statistics__dl-dt">
                  {glfStakedAmount ? formatAmount(glfStakedAmount) : REQUESTING_DATA}
                </dt>
                <dd className="statistics__dl-dd">
                  GLF staked
                </dd>
              </div>
              <a className="statistics__btn btn" onClick={() => {
                if (!active) {
                  dispatch({
                    type: HANDLE_SHOW_CONNECT_MODAL,
                    showConnectModal: true
                  });
                  return
                }
                setStaking(true)
              }}>
                Stake
              </a>

            </div>

            <div className="statistics__item column">
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="35" cy="35" r="35" fill="#94312C"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M52.7543 25.6998V24.3477H48.5138C46.6154 24.3477 44.8533 25.2817 43.8001 26.8465L38.7674 34.3237H29.0774V35.6759H37.8574L33.3297 42.4031C32.5305 43.5908 31.1928 44.2998 29.7518 44.2998H28.0012C22.824 44.2998 18.6122 40.1277 18.6122 34.9997C18.6122 29.8718 22.824 25.6998 28.0012 25.6998H39.0686V24.3477H28.0012C22.0714 24.3477 17.2471 29.1262 17.2471 34.9998C17.2471 40.8735 22.0714 45.652 28.0012 45.652H29.7518C31.6503 45.652 33.4123 44.718 34.4655 43.1532L39.4981 35.6759H48.6421V34.3237H40.4081L44.9358 27.5966C45.7353 26.4089 47.0729 25.6998 48.5138 25.6998H52.7543Z" fill="white" stroke="white"/>
              </svg>
              <div className="statistics__dl-column">
                <dt className="statistics__dl-dt">
                  {glfStakedAmount ? formatAmount(glfStakedAmount) : REQUESTING_DATA}
                </dt>
                <dd className="statistics__dl-dd">
                  GLF unstaked
                </dd>
              </div>
              <a className="statistics__btn btn" onClick={() => {
                if (!active) {
                  dispatch({
                    type: HANDLE_SHOW_CONNECT_MODAL,
                    showConnectModal: true
                  });
                  return
                }
                setUnStaking(true)
              }}>
                Unstake
              </a>

            </div>

          </div>

        </div>

        {staking && (
            <div className="modal-show">
              <div className="wrapper">
                <StakeModal
                    amount={amount}
                    symbol={'GLF'}
                    tokenName={'Gallery Token'}
                    icon={<GLFLightIcon width={43} height={43}/>}
                    balance={glfBalance}
                    onChange={(e) => {
                      setAmount(e.target.value)
                    }}
                    onMax={()=>{
                      setAmount(fromWei(glfBalance))
                    }}
                    onConfirm={onLaunch}
                    onCancel={() => {
                      setStaking(false)
                    }}/>
              </div>
            </div>
        )}

        {unStaking && (
            <div className="modal-show">
              <div className="wrapper">
                <UnstakeModal
                    amount={amount}
                    tokenName={'Bounce Token'}
                    icon={<GLFRedIcon width={43} height={43}/>}
                    symbol={'GLF'}
                    balance={glfStakedAmount}
                    onChange={(e) => {
                      setAmount(e.target.value)
                    }}
                    onMax={()=>{
                      setAmount(fromWei(glfStakedAmount))
                    }}
                    onConfirm={onUnStake}
                    onCancel={() => {
                      setUnStaking(false)
                    }}/>
              </div>
            </div>
        )}

        {staked && (
            <div className="modal-show">
              <div className="wrapper">
                <StakedTokensModal
                    amount={amount}
                    symbol={'GLF'}
                    onOk={() => {
                      window.location.reload()
                      setStaked(false)
                    }}/>
              </div>
            </div>
        )}
        {unStaked && (
            <div className="modal-show">
              <div className="wrapper">
                <UnstakedTokensModal
                    amount={amount}
                    symbol={'GLF'}
                    onOk={() => {
                      setUnStaked(false)
                    }}/>
              </div>
            </div>
        )}

        {showFailedTransactionModal && (
            <div className="modal-show">
              <div className="wrapper">
                <FailedTransactionModal/>
              </div>
            </div>
        )}

      </article>

  )
}

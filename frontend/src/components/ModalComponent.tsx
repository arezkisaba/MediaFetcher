import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, MessageCircleWarning } from 'lucide-react';
import { ModalTypeEnum } from './ModalTypeEnum';

interface ModalComponentProps {
    ModalType: ModalTypeEnum;
    ModalOpen: boolean;
    Loading: boolean;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ ModalType, ModalOpen, Loading }) => {

    const renderModalType = (modalType : ModalTypeEnum): JSX.Element => {
        switch (modalType) {
            case ModalTypeEnum.Success:
                return(
                    <>
                        <CheckCircle className="h-12 w-12 text-green-500" />
                        <div className="text-sm text-gray-900 mt-4">Torrent added</div>
                    </>
                );
            case ModalTypeEnum.Warning:
                return(
                    <>
                        <MessageCircleWarning className="h-12 w-12 text-orange-500" />
                        <div className="text-sm text-gray-900 mt-4">Torrent already added</div>
                    </>
                );
            default:
                return(
                    <>
                        <AlertCircle className="h-12 w-12 text-red-500" />
                        <div className="text-sm text-gray-900 mt-4">An error occured</div>
                    </>
                );
        }
        
        return <></>;
      };

  return (
    <div>
      {ModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            {Loading ? (
              <div className="flex justify-center">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                {renderModalType(ModalType)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalComponent;

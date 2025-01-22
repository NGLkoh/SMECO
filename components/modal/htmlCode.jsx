

'use client'

import React from 'react'
import {Modal , ModalOverlay, ModalContent,Textarea, ModalHeader, ModalCloseButton,  ModalBody , ModalFooter, Button} from '@chakra-ui/react'

const HtmlModalTemplate = ({modalHtmlTemplate, setRawHtml, closeModalHtml, html, handleSaveHtml}) => {
  
  return (
    <>
      <Modal isOpen={modalHtmlTemplate} size={'full'} onClose={() => closeModalHtml()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>HTML</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
	   	   <Textarea
				value={html}
                onChange={(e) => setRawHtml(e.target.value)}
				placeholder='Here is a sample placeholder'
				size='lg'
				height={'500px'}
			/>
          </ModalBody>

          <ModalFooter>
			 <Button mr={3} onClick={() => handleSaveHtml()}>
              Save
            </Button>
            <Button variant='ghost' mr={3} onClick={() => closeModalHtml()}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default HtmlModalTemplate
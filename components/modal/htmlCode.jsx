

'use client'

import React from 'react'
import {Modal , ModalOverlay, ModalContent,Textarea, ModalHeader, ModalCloseButton,Input,  ModalBody , ModalFooter, Button} from '@chakra-ui/react'

const HtmlModalTemplate = ({modalHtmlTemplate, setRawHtml, closeModalHtml, html, handleSaveHtml}) => {
  
  return (
    <>
      <Modal isOpen={modalHtmlTemplate} size={'full'} onClose={(e) => closeModalHtml()}>
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
			 <Button colorScheme='blue' mr={3} onClick={(e) => handleSaveHtml()}>
              Save
            </Button>
            <Button variant='ghost' mr={3} onClick={(e) => closeModalHtml()}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default HtmlModalTemplate
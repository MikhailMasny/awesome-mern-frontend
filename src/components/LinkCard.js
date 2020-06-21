import React from 'react'

// TODO: fix clicks
export const LinkCard = ({ link }) => {
  return (
    <div className="uk-container uk-margin-small-top uk-flex uk-flex-center">
      <article className="uk-article">
        <p className="uk-text-lead">Your link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
        <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
        <p>Number of clicks on the link: <strong>{link.clicks}</strong></p>
        <p>Date of creation: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
      </article>
    </div>
  )
}

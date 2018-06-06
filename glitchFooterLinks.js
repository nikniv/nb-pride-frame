// Add Remix and View Source links to the footer of a Glitch project

const re = /([\w-]+)\.glitch\.me/
if (re.test(window.location.hostname)) {
  const projectName = re.exec(window.location.hostname)[1]

  const remixLink = document.createElement('a')
  remixLink.href = `https://glitch.com/edit/#!/remix/${projectName}`
  remixLink.textContent = 'Remix this project'

  const remixPara = document.createElement('p')
  remixPara.appendChild(remixLink)

  const sourceLink = document.createElement('a')
  sourceLink.href = `https://glitch.com/edit/#!/${projectName}`
  sourceLink.textContent = 'View source'

  const sourcePara = document.createElement('p')
  sourcePara.appendChild(sourceLink)

  const footer = document.querySelector('footer')
  footer.appendChild(remixPara)
  footer.appendChild(sourcePara)
}

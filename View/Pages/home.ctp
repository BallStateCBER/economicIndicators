<?php echo $this->element('twitter'); ?>

<h1>
	Data at Your Fingertips
</h1>

<p>
	Click on a category on the left to view a wealth of economic data collected from reliable, primary sources.
</p>
<p>
	Notifications about new data sets are emailed weekly through the 
	<a href="http://cber.iweb.bsu.edu/IBB" title="Indiana Business Bulletin weekly newsletter">Indiana Business Bulletin</a> 
	and posted daily through our <em>BallStateCBER</em> accounts on 
	<a href="http://www.facebook.com/BallStateCBER" title="BallStateCBER on Facebook">Facebook</a> and 
	<a href="http://twitter.com/BallStateCBER" title="BallStateCBER on Twitter">Twitter</a>. 
	You do not need to be a member of Twitter to view our account.
</p>

<?php if (count($calendar) > 1): ?>
	<h1>Upcoming Data Releases</h1>
	<p>
		Some data sets are released weekly; others may be released monthly, quarterly, or annually.
		<?php echo $this->Html->link(
			'Full list of upcoming data releases', 
			array(
				'controller' => 'releases', 
				'action' => 'index'
			)
		); ?>
	</p>
	<?php echo $this->element('release_calendar'); ?>
<?php endif; ?>